"use client";
import { CustomDataEdge, CustomDataNode } from "@/app/path/[id]/api";
import {
  ForceFunction,
  attractionForce,
  avoidCollision,
  calculateForce,
  centerForce,
  edgeForce,
  fixCrossEdgeBackTrack,
  repulsionForcePrimary
} from "@/app/path/[id]/force";
import { GroupTypeEnum } from "@/types/enum";
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
import { Button } from "../ui/button";
import OrderNode from "./tendonCustomNode/OrderNode";
import SingleNode from "./tendonCustomNode/SingleNode";
import UnOrderNode from "./tendonCustomNode/UnorderNode";

const nodeTypes = {
  [GroupTypeEnum.Single]: SingleNode,
  [GroupTypeEnum.Ordered]: OrderNode,
  [GroupTypeEnum.Unordered]: UnOrderNode
};

export default function DirectedGraph({
  initialNodes,
  initialEdges
}: {
  initialNodes: CustomDataNode[];
  initialEdges: CustomDataEdge[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [level, setLevel] = useState(0);

  const applyForce = (...f: ForceFunction[]) => {
    calculateForce(nodes as CustomDataNode[], edges as CustomDataEdge[], f);
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
            avoidCollision(nodes as CustomDataNode[]);
            setNodes([...nodes]);
          }}
        >
          <p>Avoid collision</p>
        </Button>
        <Button
          onClick={() => {
            const cLevel = (nodes as CustomDataNode[]).reduce((acc, cur) => {
              acc = Math.max(acc, cur.data.level);
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
            fixCrossEdgeBackTrack(
              nodes as CustomDataNode[],
              edges as CustomDataEdge[]
            );
            setNodes([...nodes]);
          }}
        >
          Cross
        </Button>
        <Button
          onClick={() => {
            let level = 0;
            const focusNode: CustomDataNode[] = [];
            const focusEdge: CustomDataEdge[] = [];
            while (focusNode.length !== nodes.length) {
              focusNode.push(
                ...(nodes as CustomDataNode[]).filter(
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
                    focusNode as CustomDataNode[],
                    focusEdge as CustomDataEdge[],
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
                    focusNode as CustomDataNode[],
                    focusEdge as CustomDataEdge[],
                    [edgeForce]
                  );
                  minVelocity <= velocity ? minCount++ : (minCount = 0);
                  minVelocity = Math.min(minVelocity, velocity);
                  if (minVelocity <= 1) break;
                }

                isCross = false;
                while (
                  fixCrossEdgeBackTrack(
                    focusNode as CustomDataNode[],
                    focusEdge as CustomDataEdge[]
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
                nodes as CustomDataNode[],
                edges as CustomDataEdge[],
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
