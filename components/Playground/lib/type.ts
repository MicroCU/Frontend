export interface ITreeNode {
    id: string
    name: string;
    width?: number;
    height?: number;
    children?: string[];
    spouses?: string[];
    siblings?: string[];
    parents?: string[];
}

export interface NodeData {
    [key: string]: ITreeNode;
}