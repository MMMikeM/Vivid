import { Group } from "@visx/group";
import { Tree, hierarchy } from "@visx/hierarchy";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import { LinkVerticalLine } from "@visx/shape";
import { LinearGradient } from "@visx/gradient";
import { Text } from "@visx/text";
import { ApiNode, state, tree } from "./store/tree";
import { theme } from "./constants";
import { useSnapshot } from "valtio";
import { getEntries } from "./utils/objects";

const { background, indigo, white, green, lightpurple, blue, orange, pink } =
  theme;

type HierarchyNode = HierarchyPointNode<ApiNode>;

const updateNode = (
  node: HierarchyNode,
  newNode: Omit<Partial<ApiNode>, "node_id">
) => {
  const { node_id } = node.data;
  for (const [key, value] of getEntries(newNode)) {
    //@ts-expect-error This works, but the proxy makes the types confused
    state[node_id][key] = value;
  }
};

function RootNode({ node }: { node: HierarchyNode }) {
  const handleClick = () => {
    updateNode(node, { name: Math.random().toFixed(2).toString() });
  };
  return (
    <Group top={node.y} left={node.x} onClick={handleClick}>
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

  const handleClick = () => {
    updateNode(node, {
      name: Math.random().toFixed(2).toString() + " ",
    });
  };

  return (
    <Group top={node.y} left={node.x} onClick={handleClick}>
      <rect
        height={rectHeight}
        width={rectWidth}
        y={centerY}
        x={centerX} // Update X position based on the new width
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
/** Handles rendering Root, Parent, and other Nodes. */
function Node({ node }: { node: HierarchyNode }) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;
  if (isParent) return <ParentNode node={node} />;

  return (
    <Group top={node.y} left={node.x}>
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

const defaultMargin = { top: 80, left: 80, right: 80, bottom: 80 };

export type TreeProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function Example({
  width,
  height,
  margin = defaultMargin,
}: TreeProps) {
  const data = hierarchy(useSnapshot(tree));
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <LinearGradient id="lg" from={orange} to={pink} />
      <rect width={width} height={height} fill={background} />
      <Tree<ApiNode>
        root={data}
        size={[xMax, yMax]}
        separation={(a, b) => (a.parent === b.parent ? 2 : 3)}
      >
        {(tree) => {
          return (
            <Group top={margin.top} left={margin.left}>
              {tree.links().map((link, i) => (
                <LinkVerticalLine
                  key={`link-${i}`}
                  data={link}
                  stroke={lightpurple}
                  strokeWidth="1"
                  fill="none"
                />
              ))}
              {tree.descendants().map((node, i) => (
                <Node key={`node-${i}`} node={node} />
              ))}
            </Group>
          );
        }}
      </Tree>
    </svg>
  );
}
