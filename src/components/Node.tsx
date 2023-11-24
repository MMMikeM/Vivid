import { ApiTreeNode } from "../store/tree";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import WithTooltip from "./HOC/Tooltip";
import { Service } from "./Nodes/Service";

export type HierarchyNode = HierarchyPointNode<ApiTreeNode>;

export function RootNode({ node }: { node: HierarchyNode }) {
  return (
    <WithTooltip component={<>hi Mike</>}>
      <Service node={node} />
    </WithTooltip>
  );
}
export function ParentNode({ node }: { node: HierarchyNode }) {
  return (
    <WithTooltip component={<>hi Mike</>}>
      <Service node={node} />
    </WithTooltip>
  );
}

export function Node({ node }: { node: HierarchyNode }) {
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;
  if (isParent) return <ParentNode node={node} />;

  return (
    <WithTooltip component={<>hi Mike</>}>
      <Service node={node} />
    </WithTooltip>
  );
}
