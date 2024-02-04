"use client";
import { GroupType, PathEdge, PathNode } from "@/types/path";
import {
  ForceFunction,
  attractionForce,
  avoidCollision,
  calculateForce,
  centerForce,
  edgeForce,
  fixCrossEdgeBackTrack,
  repulsionForcePrimary
} from "@/utils/path";
import { useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Panel,
  useEdgesState,
  useNodesState
} from "reactflow";
import "reactflow/dist/style.css";
import OrderedGroup from "./OrderNode";
import SingleGroup from "./SingleNode";
import UnorderedGroup from "./UnorderNode";
import { Button } from "./ui/button";

const nodeTypes = {
  [GroupType.Single]: SingleGroup,
  [GroupType.Ordered]: OrderedGroup,
  [GroupType.Unordered]: UnorderedGroup
};

export default function DirectedGraph({
  initialNodes,
  initialEdges
}: {
  initialNodes: PathNode[];
  initialEdges: PathEdge[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [level, setLevel] = useState(0);

  const applyForce = (...f: ForceFunction[]) => {
    calculateForce(nodes as PathNode[], edges as PathEdge[], f);
    setNodes([...nodes]);
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
      <Panel position="bottom-right">
        <Button
          onClick={() => {
            applyForce(edgeForce);
          }}
        >
          <p>Edge force</p>
        </Button>
        <Button
          onClick={() => {
            applyForce(attractionForce, repulsionForcePrimary, centerForce);
          }}
        >
          <p>Apply all force</p>
        </Button>
        <Button
          onClick={() => {
            avoidCollision(nodes as PathNode[]);
            setNodes([...nodes]);
          }}
        >
          <p>Avoid collision</p>
        </Button>
        <Button
          onClick={() => {
            const cLevel = (nodes as PathNode[]).reduce((acc, cur) => {
              acc = Math.max(acc, cur.data.level!);
              return acc;
            }, -1);

            const newNode = [
              ...initialNodes.filter((node) => node.data.level === cLevel + 1),
              ...nodes
            ];

            const newNodeId = newNode.map((node) => node.id);

            console.log(newNodeId);

            const newEdges = initialEdges.filter((edge) => {
              return (
                newNodeId.includes(edge.source) &&
                newNodeId.includes(edge.target)
              );
            });

            console.log(newNode, newEdges);

            setNodes([...newNode]);
            setEdges([...newEdges]);
          }}
        >
          <p>Add</p>
        </Button>
        <Button
          onClick={() => {
            fixCrossEdgeBackTrack(nodes as PathNode[], edges as PathEdge[]);
            setNodes([...nodes]);
          }}
        >
          Cross
        </Button>
        <Button
          onClick={() => {
            let level = 0;
            const focusNode: PathNode[] = [];
            const focusEdge: PathEdge[] = [];
            while (focusNode.length !== nodes.length) {
              focusNode.push(
                ...(nodes as PathNode[]).filter(
                  (node) => node.data.level === level
                  // (node) => node.data.level <= level
                )
              );
              focusEdge.push(
                ...edges.filter((edge) => {
                  return (
                    focusNode.map((node) => node.id).includes(edge.source) &&
                    focusNode.map((node) => node.id).includes(edge.target)
                  );
                })
              );

              let isCross = true;
              while (isCross) {
                let minVelocity = 100;
                let minCount = 0;
                while (minCount < 10) {
                  const { force, velocity } = calculateForce(
                    focusNode as PathNode[],
                    focusEdge as PathEdge[],
                    [attractionForce, repulsionForcePrimary, centerForce]
                  );
                  minVelocity <= velocity ? minCount++ : (minCount = 0);
                  minVelocity = Math.min(minVelocity, velocity);
                  if (minVelocity <= 1) break;
                }

                minVelocity = 100;
                minCount = 0;
                while (minCount < 10) {
                  const { force, velocity } = calculateForce(
                    focusNode as PathNode[],
                    focusEdge as PathEdge[],
                    [edgeForce]
                  );
                  minVelocity <= velocity ? minCount++ : (minCount = 0);
                  minVelocity = Math.min(minVelocity, velocity);
                  if (minVelocity <= 1) break;
                }

                isCross = false;
                while (
                  fixCrossEdgeBackTrack(
                    focusNode as PathNode[],
                    focusEdge as PathEdge[]
                  )
                ) {
                  isCross = true;
                }
              }
              level++;
            }
            let minVelocity = 100;
            let minCount = 0;
            while (minCount < 10) {
              const { force, velocity } = calculateForce(
                nodes as PathNode[],
                edges as PathEdge[],
                [attractionForce, repulsionForcePrimary, centerForce]
              );
              minVelocity <= velocity ? minCount++ : (minCount = 0);
              minVelocity = Math.min(minVelocity, velocity);
              if (minVelocity <= 1) break;
              console.log(minVelocity, minCount);
            }

            // setLevel((l) => l + 1);
            setNodes([...nodes]);
            console.log(focusNode, focusEdge, level);
          }}
        >
          Auto
        </Button>
      </Panel>
    </>
  );
}
