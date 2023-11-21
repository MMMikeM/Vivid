import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { ApiTreeNode, dictState } from "../store/tree";
import { getEntries } from "../utils/objects";
import { theme } from "../constants";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";

export type HierarchyNode = HierarchyPointNode<ApiTreeNode>;

const { indigo, background, blue, green, white } = theme;

const updateNode = (
  node: HierarchyNode,
  newNode: Omit<Partial<ApiTreeNode>, "node_id">
) => {
  const { id } = node.data;
  for (const [key, value] of getEntries(newNode)) {
    //@ts-expect-error This works, but the proxy makes the types confused
    dictState[id][key] = value;
  }
};
const handleClick = (node: HierarchyNode) => {
  updateNode(node, { name: Math.random().toFixed(2).toString() + " " });
};

function RootNode({ node }: { node: HierarchyNode }) {
  return (
    <Group
      top={node.y}
      left={node.x}
      onClick={() => handleClick(node)}
      className="cursor-pointer"
    >
      <circle r={12} fill="url('#lg')" />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={indigo}
      >
        {node.data.name}
      </text>
    </Group>
  );
}
function ParentNode({ node }: { node: HierarchyNode }) {
  const [rectHeight, rectWidth] = [24, 120];
  const centerX = -rectWidth / 2;
  const centerY = -rectHeight / 2;

  const name = node.data.name.repeat(5);

  return (
    <Group
      top={node.y}
      left={node.x}
      onClick={() => handleClick(node)}
      className="cursor-pointer"
    >
      <rect
        height={rectHeight}
        width={rectWidth}
        y={centerY}
        x={centerX}
        fill={background}
        stroke={blue}
        strokeWidth={1}
      />
      <Text
        verticalAnchor="start"
        x={centerX + 4}
        y={centerY + 4}
        fontSize={10}
        fontFamily="monospace"
        textAnchor="start"
        style={{ pointerEvents: "none" }}
        width={rectWidth - 8}
        fill={white}
      >
        {name}
      </Text>
    </Group>
  );
}
export function Node({ node }: { node: HierarchyNode }) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;
  if (isParent) return <ParentNode node={node} />;

  return (
    <Group
      className="cursor-pointer"
      top={node.y}
      left={node.x}
      style={{ cursor: "pointer !important" }}
      onClick={() => handleClick(node)}
    >
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={background}
        stroke={green}
        strokeWidth={1}
        strokeDasharray="2,2"
        strokeOpacity={0.6}
        rx={10}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="monospace"
        textAnchor="middle"
        fill={green}
        style={{ pointerEvents: "none" }}
      >
        {node.data.name}
      </text>
    </Group>
  );
}
