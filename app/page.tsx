"use client";
import { CustomEdge } from "@/components/CustomEdge";
import CustomNode from "@/components/CustomNode";
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from "d3";
import { useEffect, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useStore,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "a",
    data: { label: "label a" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "b",
    data: { label: "label b" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "c",
    data: { label: "label c" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "d",
    data: { label: "label d" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "e",
    data: { label: "label e" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "f",
    data: { label: "label f" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "g",
    data: { label: "label g" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "h",
    data: { label: "label h" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "i",
    data: { label: "label i" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "j",
    data: { label: "label j" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "k",
    data: { label: "label k" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "l",
    data: { label: "label l" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "n",
    data: { label: "label n" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "m",
    data: { label: "label m" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "o",
    data: { label: "label o", color: "blue", mass: 5 },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "p",
    data: { label: "label p", color: "red", mass: 3 },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "q",
    data: { label: "label q", color: "green", mass: 2 },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "r",
    data: { label: "label r" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "s",
    data: { label: "label s" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "t",
    data: { label: "label t" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "u",
    data: { label: "label u" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "v",
    data: { label: "label v" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "w",
    data: { label: "label w" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "x",
    data: { label: "label x" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "y",
    data: { label: "label y" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "z",
    data: { label: "label z" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "aa",
    data: { label: "label aa" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "ab",
    data: { label: "label ab" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "ac",
    data: { label: "label ac" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "ad",
    data: { label: "label ad" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "ae",
    data: { label: "label ae" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "af",
    data: { label: "label af" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "ag",
    data: { label: "label ag" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "ah",
    data: { label: "label ah" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "ai",
    data: { label: "label ai" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
  {
    id: "aj",
    data: { label: "label aj" },
    position: { x: 0, y: 0 },
    type: "customNode",
  },
];

const initialEdges = [
  { id: "ab", source: "a", target: "b", type: "customEdge" },
  { id: "ac", source: "a", target: "c", type: "customEdge" },
  { id: "ad", source: "a", target: "d", type: "customEdge" },
  { id: "ae", source: "a", target: "e", type: "customEdge" },
  { id: "ef", source: "e", target: "f", type: "customEdge" },
  { id: "eg", source: "e", target: "g", type: "customEdge" },
  { id: "eh", source: "e", target: "h", type: "customEdge" },
  { id: "ei", source: "e", target: "i", type: "customEdge" },
  { id: "ej", source: "e", target: "j", type: "customEdge" },
  { id: "ek", source: "e", target: "k", type: "customEdge" },
  { id: "el", source: "e", target: "l", type: "customEdge" },
  { id: "en", source: "e", target: "n", type: "customEdge" },
  { id: "em", source: "e", target: "m", type: "customEdge" },
  { id: "op", source: "o", target: "p", type: "customEdge" },
  { id: "oq", source: "o", target: "q", type: "customEdge" },
  { id: "pq", source: "p", target: "q", type: "customEdge" },
  { id: "rs", source: "p", target: "s", type: "customEdge" },
  { id: "st", source: "p", target: "t", type: "customEdge" },
  { id: "tu", source: "p", target: "u", type: "customEdge" },
  { id: "uv", source: "p", target: "v", type: "customEdge" },
  { id: "vw", source: "p", target: "e", type: "customEdge" },
  { id: "wx", source: "w", target: "x", type: "customEdge" },
  { id: "xy", source: "x", target: "y", type: "customEdge" },
  { id: "yz", source: "y", target: "w", type: "customEdge" },
  { id: "zad", source: "z", target: "ad", type: "customEdge" },
  { id: "zab", source: "z", target: "ab", type: "customEdge" },
  { id: "zac", source: "z", target: "ac", type: "customEdge" },
  { id: "zaf", source: "z", target: "af", type: "customEdge" },
  { id: "zah", source: "z", target: "ah", type: "customEdge" },
];

const nodeWithMass = initialNodes.map((node) => {
  return {
    ...node,
    data: {
      ...node.data,
      mass: initialEdges.reduce((acc, edge) => {
        if (edge.source === node.id || edge.target === node.id) {
          acc += 1;
        }
        return acc;
      }, 0),
    },
  };
});

const edgeWithLength = initialEdges.map((edge) => {
  return {
    ...edge,
    data: {
      length: nodeWithMass.reduce((acc, node) => {
        if (edge.source === node.id || edge.target === node.id) {
          acc += node.data.mass;
        }
        return acc;
      }, 0),
    },
  };
});

function useLayoutElements() {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const initialised = useStore((store: any) =>
    [...store.nodeInternals.values()].every((node) => node.width && node.height)
  );

  return useMemo(() => {
    let nodes = getNodes().map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }));
    let edges = getEdges().map((edge) => edge);
    let running = false;

    // If React Flow hasn't initialised our nodes with a width and height yet, or
    // if there are no nodes in the flow, then we can't run the simulation!
    if (!initialised || nodes.length === 0) return [false, {}];

    const simulation = forceSimulation()
      .force(
        "charge",
        forceManyBody().strength((d: any) => {
          return -(d.data.mass * d.data.mass) * 100;
        })
      )
      .force("x", forceX().x(0).strength(0.03))
      .force("y", forceY().y(0).strength(0.04))
      .force(
        "collide",
        forceCollide().radius((d: any) => d.data.mass * 4 + 70)
      )
      .alphaTarget(0.1)
      .stop()
      .nodes(nodes)
      .force(
        "link",
        forceLink(edges)
          .id((d: any) => d.id)
          .strength(1)
          .distance((d: any) => {
            return d.data.length * d.data.length + 70;
          })
      );

    // The tick function is called every animation frame while the simulation is
    // running and progresses the simulation one step forward each time.
    const tick = () => {
      getNodes().forEach((node, i) => {
        const dragging = Boolean(
          document.querySelector(`[data-id="${node.id}"].dragging`)
        );

        // Setting the fx/fy properties of a node tells the simulation to "fix"
        // the node at that position and ignore any forces that would normally
        // cause it to move.
        nodes[i].fx = dragging ? node.position.x : null;
        nodes[i].fy = dragging ? node.position.y : null;
      });

      simulation.tick();
      setNodes(
        nodes.map((node) => ({ ...node, position: { x: node.x, y: node.y } }))
      );

      window.requestAnimationFrame(() => {
        // Give React and React Flow a chance to update and render the new node
        // positions before we fit the viewport to the new layout.
        fitView();

        // If the simulation hasn't be stopped, schedule another tick.
        if (running) tick();
      });
    };

    const toggle = () => {
      running = !running;
      running && window.requestAnimationFrame(tick);
    };

    const isRunning = () => running;

    return [true, { toggle, isRunning }];
  }, [initialised]);
}

function LayoutFlow() {
  const [nodes, , onNodesChange] = useNodesState(nodeWithMass);
  const [edges, , onEdgesChange] = useEdgesState(edgeWithLength);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), []);

  const [initialised, { toggle, isRunning }] = useLayoutElements();

  useEffect(() => {
    if (initialised) {
      toggle();
    }
  }, [initialised]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    ></ReactFlow>
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
