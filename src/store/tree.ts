import { proxy } from "valtio";

export type Node = {
  name: string;
  id: number;
  children?: Node[];
};

export type ApiNode = {
  node_id: number;
  name: string;
  children: number[] | ApiNode[];
  parent: number | null;
};

const getId = () => Math.floor(Math.random() * 10000);

const flattenTree = (node: Node, parentId?: number, graph: ApiNode[] = []) => {
  const newNode = {
    node_id: node.id,
    name: node.name,
    children: node.children?.map((child) => child.id) || [],
    parent: parentId!,
  };

  graph.push(newNode);

  node.children?.forEach((child) => {
    flattenTree(child, node.id, graph);
  });

  return graph;
};

export const initialState: Node = {
  name: "T",
  id: getId(),
  children: [
    {
      name: "A",
      id: getId(),
      children: [
        { name: "A1", id: getId() },
        { name: "A2", id: getId() },
        { name: "A3", id: getId() },
        {
          name: "C",
          id: getId(),
          children: [
            {
              name: "C1",
              id: getId(),
            },
            {
              name: "D",
              id: getId(),
              children: [
                {
                  id: getId(),
                  name: "D1",
                },
                {
                  id: getId(),
                  name: "D2",
                },
                {
                  id: getId(),
                  name: "D3",
                },
              ],
            },
          ],
        },
      ],
    },
    { name: "Z", id: getId() },
    {
      name: "B",
      id: getId(),
      children: [
        { name: "B1", id: getId() },
        { name: "B2", id: getId() },
        { name: "B3", id: getId() },
      ],
    },
  ],
};

const flatState = flattenTree(initialState);

const nodes: Record<number, ApiNode> = flatState.reduce((acc, node) => {
  acc[node.node_id] = node;
  return acc;
}, {} as Record<number, ApiNode>);

export const mapToTree = (nodes: Record<number, ApiNode>): ApiNode => {
  for (const node of Object.values(nodes)) {
    if (node.children) {
      node.children = node.children.map((childId) => nodes[childId as number]);
    }
  }

  const root = Object.values(nodes).filter((node) => !node.parent);

  if (root.length === 0) {
    return {} as ApiNode;
  }
  if (root.length > 1) {
    throw new Error("Multiple root nodes");
  }

  return root[0];
};

export const state = proxy(nodes);

export const tree = mapToTree(state);
