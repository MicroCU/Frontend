"use client";
import { CustomDataEdge, CustomDataNode } from "@/app/path/[id]/api";
import {
  ForceFunction,
  attractionForce,
  avoidCollision,
  calculateForce,
  centerForce,
  edgeForce,
  fixCrossEdge,
  repulsionForcePrimary
} from "@/app/path/[id]/force";
import { GroupTypeEnum } from "@/types/enum";
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
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
            fixCrossEdge(nodes as CustomDataNode[], edges as CustomDataEdge[]);
            setNodes([...nodes]);
          }}
        >
          Cross
        </Button>
        <Button
          onClick={() => {
            let level = 0;

            while (nodes.length < 2) {
            // while (nodes.length !== initialNodes.length) {
              let isCross = true;
              while (isCross) {
                nodes.push(
                  ...initialNodes.filter((node) => node.data.level === level)
                );
                edges.push(
                  ...initialEdges.filter((edge) => {
                    return (
                      nodes.map((node) => node.id).includes(edge.source) &&
                      nodes.map((node) => node.id).includes(edge.target)
                    );
                  })
                );

                let minVelocity = 100;
                let minCount = 0;
                while (minCount < 5) {
                  const { force, velocity } = calculateForce(
                    nodes as CustomDataNode[],
                    edges as CustomDataEdge[],
                    [attractionForce, repulsionForcePrimary, centerForce]
                  );
                  minVelocity = Math.min(minVelocity, velocity);
                  minVelocity === velocity ? (minCount = 0) : minCount++;
                  minVelocity < 1 && (minCount = 5);
                }

                while (minVelocity > 5) {
                  const { force, velocity } = calculateForce(
                    nodes as CustomDataNode[],
                    edges as CustomDataEdge[],
                    [edgeForce]
                  );
                  minVelocity = Math.min(minVelocity, velocity);
                  minVelocity === velocity ? (minCount = 0) : minCount++;
                  minVelocity < 1 && (minCount = 5);
                }

                isCross = false;
                while (
                  fixCrossEdge(
                    nodes as CustomDataNode[],
                    edges as CustomDataEdge[]
                  )
                ) {
                  isCross = true;
                }
              }
              level++;
              setNodes([...nodes]);
              setEdges([...edges]);
            }
          }}
        >
          Auto
        </Button>
      </Panel>
    </>
  );
}
