import { ApiTreeNode, dictProxy } from "../store/tree";
import { getEntries } from "./objects";
import { HierarchyNode } from "../components/Node";

const updateNode = (
  node: HierarchyNode,
  newNode: Omit<Partial<ApiTreeNode>, "node_id">
) => {
  const { id } = node.data;
  for (const [key, value] of getEntries(newNode)) {
    //@ts-expect-error This works, but the proxy makes the types confused
    dictProxy[id][key] = value;
  }
};

export const handleClick = (node: HierarchyNode) => {
  updateNode(node, { name: Math.random().toFixed(2).toString() + " " });
};
