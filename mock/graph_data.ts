import { PathDisplay } from "@/types/enum";
import { GraphEdge, GraphNode } from "@/types/graph";

export const mockGraphData: { nodes: GraphNode[]; edges: GraphEdge[] }[] = [
  {
    nodes: [
      {
        id: "1",
        data: {
          name: "Node 1",
          description: "Node 1 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      },
      {
        id: "2",
        data: {
          name: "Node 2",
          description: "Node 2 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      }
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2"
      }
    ]
  },
  {
    nodes: [
      {
        id: "1",
        data: {
          name: "Node 1",
          description: "Node 1 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      },
      {
        id: "2",
        data: {
          name: "Node 2",
          description: "Node 2 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      },
      {
        id: "3",
        data: {
          name: "Node 3",
          description: "Node 3 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      }
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2"
      },
      {
        id: "e2-3",
        source: "2",
        target: "3"
      },
      {
        id: "e1-3",
        source: "1",
        target: "3"
      }
    ]
  },
  {
    nodes: [
      {
        id: "1",
        data: {
          name: "Node 1",
          description: "Node 1 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      },
      {
        id: "2",
        data: {
          name: "Node 2",
          description: "Node 2 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      },
      {
        id: "3",
        data: {
          name: "Node 3",
          description: "Node 3 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      }
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2"
      },
      {
        id: "e1-3",
        source: "2",
        target: "3"
      }
    ]
  },
  {
    nodes: [
      {
        id: "1",
        data: {
          name: "Node 1",
          description: "Node 1 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      },
      {
        id: "2",
        data: {
          name: "Node 2",
          description: "Node 2 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      },
      {
        id: "3",
        data: {
          name: "Node 3",
          description: "Node 3 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      },
      {
        id: "4",
        data: {
          name: "Node 4",
          description: "Node 4 description",
          picture: "https://via.placeholder.com/150",
          status: "active"
        }
      }
    ],
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2"
      },
      {
        id: "e2-3",
        source: "2",
        target: "3"
      },
      {
        id: "e1-3",
        source: "1",
        target: "3"
      }
    ]
  },
  {
    nodes: Array.from({ length: 13 }, (_, index) => ({
      id: index.toString(),
      data: {
        name: `Node ${index}`,
        description: `Node ${index} description`,
        picture: "https://via.placeholder.com/150",
        status: "active"
      }
    })),
    edges: [
      {
        id: "e2-3",
        source: "2",
        target: "3"
      },
      {
        id: "e1-3",
        source: "1",
        target: "3"
      },
      {
        id: "e3-4",
        source: "3",
        target: "4"
      },
      {
        id: "e4-5",
        source: "4",
        target: "5"
      },
      {
        id: "e5-6",
        source: "5",
        target: "6"
      },
      {
        id: "e7-5",
        source: "7",
        target: "5"
      },
      {
        id: "e8-5",
        source: "8",
        target: "5"
      },
      {
        id: "e9-5",
        source: "9",
        target: "5"
      },
      {
        id: "e0-5",
        source: "0",
        target: "5"
      },
      {
        id: "e3-10",
        source: "3",
        target: "10"
      },
      {
        id: "e3-11",
        source: "3",
        target: "11"
      },
      {
        id: "e3-12",
        source: "3",
        target: "12"
      }
    ]
  },
  {
    nodes: Array.from({ length: 20 }, (_, index) => ({
      id: index.toString(),
      data: {
        name: `Node ${index}`,
        description: `Node ${index} description`,
        picture: "https://via.placeholder.com/150",
        status: "active"
      }
    })),
    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2"
      },
      {
        id: "e2-3",
        source: "2",
        target: "3"
      },
      {
        id: "e1-3",
        source: "1",
        target: "3"
      },
      {
        id: "e3-4",
        source: "3",
        target: "4"
      },
      {
        id: "e4-5",
        source: "4",
        target: "5"
      },
      {
        id: "e5-6",
        source: "5",
        target: "6"
      },
      {
        id: "e7-5",
        source: "7",
        target: "5"
      },
      {
        id: "e8-5",
        source: "8",
        target: "5"
      },
      {
        id: "e9-5",
        source: "9",
        target: "5"
      },
      {
        id: "e0-5",
        source: "0",
        target: "5"
      },
      {
        id: "e9-10",
        source: "9",
        target: "10"
      },
      {
        id: "e9-11",
        source: "9",
        target: "11"
      },
      {
        id: "e9-12",
        source: "9",
        target: "12"
      },
      {
        id: "e14-13",
        source: "14",
        target: "13"
      },
      {
        id: "e13-15",
        source: "13",
        target: "15"
      },
      {
        id: "e13-16",
        source: "13",
        target: "16"
      },
      {
        id: "e13-17",
        source: "13",
        target: "17"
      },
      {
        id: "e13-18",
        source: "13",
        target: "18"
      },
      {
        id: "e13-19",
        source: "13",
        target: "19"
      },
      {
        id: "e13-9",
        source: "13",
        target: "9"
      }
    ]
  }
].map(({ nodes, edges }) => {
  return {
    nodes: nodes.map((node) => {
      return {
        id: node.id,
        data: {
          name: node.data.name,
          description: node.data.description,
          picture: node.data.picture,
          status: node.data.status,
          force: { x: 0, y: 0 },
          velocity: { x: 0, y: 0 }
        },
        position: { x: 0, y: 0 },
        type: PathDisplay.Unselect
      };
    }),
    edges: edges.map((edge) => {
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: "default"
      };
    })
  };
});
