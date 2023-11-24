import { proxy } from "valtio";
import { faker } from "@faker-js/faker";

type OldNode = TreeNodeBase<{
  name: string;
}>;

type TreeNodeBase<T> = {
  id: number;
  children?: TreeNodeBase<T>[];
  parent?: number;
} & T;

type ListNodeBase<T> = {
  id: number;
  children?: number[];
  parent?: number;
} & T;

export const typeOptions = [
  "Lambda",
  "HTTP",
  "SNS",
  "DynamoDB",
  "EC2",
  "SQS",
  "S3",
  "RDS",
  "APIGateway",
];
export const teamOptions = [
  "DevSecOps",
  "Finance",
  "Merchant-X",
  "Commerce",
  "Platform",
  "Operations",
  "Data",
];

export type Team = (typeof teamOptions)[number];

export type ApiObj = {
  name: string;
  type?: (typeof typeOptions)[number];
  description?: string;
  team?: Team;
  documentationUrl?: string;
};

export type ApiListNode = ListNodeBase<ApiObj>;

export type ApiTreeNode = TreeNodeBase<ApiObj>;

const getId = () => Math.floor(Math.random() * 10000);

const mockData = (item: ApiListNode) => {
  return {
    ...item,
    name: faker.company.buzzPhrase().split(" ").join("-"),
    type: faker.helpers.arrayElement(typeOptions),
    description: faker.lorem.paragraph().substring(0, 200), // Ensures description is not more than 200 characters
    team: faker.helpers.arrayElement(teamOptions),
    documentationUrl: faker.internet.url(),
  } as ApiListNode;
};

const initialState: OldNode = {
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
        {
          name: "B3",
          id: getId(),
          children: [
            { name: "A1", id: getId() },
            { name: "A2", id: getId() },
            { name: "A3", id: getId() },
            { name: "A1", id: getId() },
            { name: "A2", id: getId() },
            { name: "A3", id: getId() },
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
      ],
    },
  ],
};

const flattenTree = (
  { id, name, children }: OldNode,
  parent?: number,
  nodeList: ApiListNode[] = []
): ApiListNode[] => {
  const newNode: ApiListNode = {
    id,
    name,
    parent,
    children: children?.map((child) => child.id),
  };

  nodeList.push(newNode);

  children?.forEach((child) => {
    flattenTree(child, id, nodeList);
  });

  return nodeList;
};

const arrayToDict = (nodes: ApiListNode[]): Record<number, ApiListNode> =>
  nodes.reduce((acc, node) => {
    acc[node.id] = { ...node };
    return acc;
  }, {} as Record<number, ApiListNode>);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const duplicateNodes = (
  nodes: Record<number, ApiListNode>
): Record<number, ApiListNode> => {
  const newNodes = { ...nodes };
  Object.values(nodes).forEach((node) => {
    if (node.parent === undefined) {
      return;
    }
    const newNode = { ...node };
    newNode.id = getId();
    newNodes[newNode.id] = newNode;
    if (newNode.parent) {
      newNodes[newNode.parent].children?.push(newNode.id);
    }
  });
  return newNodes;
};

export const dictToTree = (nodes: Record<number, ApiListNode>): ApiTreeNode => {
  const nodeList = Object.values(nodes);

  const root = nodeList.filter((node) => {
    return node.parent == undefined;
  });
  if (root.length === 0) {
    throw new Error("No root nodes found");
  }
  if (root.length > 1) {
    throw new Error("Multiple root nodes");
  }

  const rootNode: ApiTreeNode = {
    ...root[0],
    children: [],
  };

  const buildTree = (nodeId: number): ApiTreeNode => {
    const node = nodes[nodeId];

    const treeNode: ApiTreeNode = {
      ...node,
      children: node.children?.map(buildTree),
    };

    return treeNode;
  };

  return buildTree(rootNode.id);
};

const flat = flattenTree(initialState);
const flatWithMockData = flat.map(mockData);
const dictOfNodes = arrayToDict(flatWithMockData);
export const dictProxy = proxy(dictOfNodes);
