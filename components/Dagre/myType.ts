interface INode {
    id: string;
    next: string[];
}

interface IGraph {
    [id: string]: INode;
}
