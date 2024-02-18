import { Edge, Node } from "reactflow";
import { PathDisplay } from "./enum";

export interface Path {
  name: string;
  description: string;
  picture: string;
  status: string;
  force?: { x: number; y: number };
  velocity?: { x: number; y: number };
}

export interface Graph {
  paths: Path[];
}

export type GraphNode = Node<Path, PathDisplay>;
export type GraphEdge = Edge<undefined>;
