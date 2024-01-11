"use client";
import { CustomEdge } from "@/components/CustomEdge";
import CustomNode from "@/components/CustomNode";
import { useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  calculateCollide,
  calculateForce,
  calculateLevel,
  calculateRepulsionForce,
  calculateSpring,
  hasCrossEdge,
  TopologicalSort as topologicalSort,
} from "./helper";

export type DataNode = {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
  type: string;
  level: number;
  force: { x: number; y: number };
  velocity: { x: number; y: number };
};

const initialNodes: DataNode[] = [
  {
    id: "a",
    data: { label: "label a" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "b",
    data: { label: "label b" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "c",
    data: { label: "label c" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "d",
    data: { label: "label d" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "e",
    data: { label: "label e" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "f",
    data: { label: "label f" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "g",
    data: { label: "label g" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "h",
    data: { label: "label h" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "i",
    data: { label: "label i" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "j",
    data: { label: "label j" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "k",
    data: { label: "label k" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "l",
    data: { label: "label l" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "m",
    data: { label: "label m" },
    position: { x: 0, y: 0 },
    type: "customNode",

    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "n",
    data: { label: "label n" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "o",
    data: { label: "label o" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
  {
    id: "p",
    data: { label: "label p" },
    position: { x: 0, y: 0 },
    type: "customNode",
    level: 0,
    force: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  },
];

export type DataEdge = {
  id: string;
  source: string;
  target: string;
  type: string;
};

const initialEdges: DataEdge[] = [
  { id: "ab", source: "a", target: "b", type: "customEdge" },
  { id: "ac", source: "a", target: "c", type: "customEdge" },

  { id: "bd", source: "b", target: "d", type: "customEdge" },
  { id: "be", source: "b", target: "e", type: "customEdge" },
  { id: "bf", source: "b", target: "f", type: "customEdge" },

  { id: "cg", source: "c", target: "g", type: "customEdge" },
  { id: "ch", source: "c", target: "h", type: "customEdge" },

  { id: "di", source: "d", target: "i", type: "customEdge" },
  { id: "ei", source: "e", target: "i", type: "customEdge" },

  { id: "fj", source: "f", target: "j", type: "customEdge" },
  { id: "gj", source: "g", target: "j", type: "customEdge" },
  { id: "hk", source: "h", target: "k", type: "customEdge" },
  { id: "hl", source: "h", target: "l", type: "customEdge" },
  { id: "hm", source: "h", target: "m", type: "customEdge" },

  { id: "in", source: "i", target: "n", type: "customEdge" },
  { id: "jn", source: "j", target: "n", type: "customEdge" },

  { id: "go", source: "g", target: "o", type: "customEdge" },
  { id: "no", source: "n", target: "o", type: "customEdge" },

  { id: "np", source: "n", target: "p", type: "customEdge" },
  { id: "op", source: "o", target: "p", type: "customEdge" },
];

const cNodes: DataNode[] = [];
const cEdges: DataEdge[] = [];

function LayoutFlow() {
  const { getNodes, setNodes, getEdges, setEdges, fitView } = useReactFlow();

  useEffect(() => {
    topologicalSort(initialNodes, initialEdges);
    // initialNodes.forEach((node) => {
    //   node.position.y = node.level * 200;
    // });
    // for (let i = 0; i < 5; i++) {
    //   calculateCollide(initialNodes, 100);
    // }
    console.log(initialNodes);
  }, []);

  const [cLevel, setCLevel] = useState(0);

  const [nodes, , onNodesChange] = useNodesState(cNodes);
  const [edges, , onEdgesChange] = useEdgesState(cEdges);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), []);

  const applyForce = (f: () => void) => {
    getNodes().forEach((node) => {
      cNodes.find((n) => n.id === node.id)!.position.y = node.position.y;
      cNodes.find((n) => n.id === node.id)!.position.x = node.position.x;
    });
    cNodes.forEach((node) => {
      node.force = { x: 0, y: 0 };
    });
    f();
    calculateForce(cNodes);
    setNodes(cNodes);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    >
      <Panel position="bottom-right">
        <button
          onClick={() => {
            const matchingNodes = initialNodes.filter(
              (node) => node.level === cLevel
            );
            let pos = 0;
            matchingNodes.forEach((node) => {
              node.position.y = node.level * 200;
              node.position.x = pos * 200;
              pos++;
            });
            for (let i = 0; i < 5; i++) {
              calculateCollide(matchingNodes, 100);
            }
            cNodes.push(...matchingNodes);

            const matchingEdges = initialEdges.filter((edge) => {
              if (cEdges.find((e) => e.id === edge.id)) return false;
              let s = false;
              let t = false;
              for (const node of cNodes) {
                if (node.id === edge.source) s = true;
                if (node.id === edge.target) t = true;
              }
              return s && t;
            });
            cEdges.push(...matchingEdges);

            setNodes(cNodes);
            setEdges(cEdges);

            setCLevel((cLevel) => cLevel + 1);
          }}
        >
          Add Level
        </button>
        <button
          onClick={() => {
            applyForce(() => {
              const cross = hasCrossEdge(initialNodes, initialEdges);
              calculateRepulsionForce(initialNodes);
              calculateSpring(initialNodes, initialEdges);
              calculateLevel(initialNodes);
            });
          }}
        >
          CrossX
        </button>
        <button
          onClick={() => {
            applyForce(() => {
              const cross = hasCrossEdge(initialNodes, initialEdges);
              calculateSpring(cNodes, cross);
            });
          }}
        >
          Cross
        </button>
        <button
          onClick={() => {
            applyForce(() => {
              calculateRepulsionForce(initialNodes);
            });
          }}
        >
          Repulsion
        </button>
        <button
          onClick={() => {
            applyForce(() => {
              const cross = hasCrossEdge(cNodes, cEdges);
              calculateSpring(cNodes, cross, 50);
            });
          }}
        >
          Spring
        </button>
        <button
          onClick={() => {
            applyForce(() => {
              const cross = hasCrossEdge(cNodes, cEdges);
              calculateRepulsionForce(cNodes, 5000);
              calculateSpring(cNodes, cEdges, 150);
              calculateLevel(cNodes);
            });
          }}
        >
          Tick
        </button>
      </Panel>
    </ReactFlow>
  );
}

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
    </main>
  );
}
