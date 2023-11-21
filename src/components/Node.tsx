import React, { useCallback } from "react";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { ApiTreeNode, dictState } from "../store/tree";
import { getEntries } from "../utils/objects";
import { theme } from "../constants";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";

export type HierarchyNode = HierarchyPointNode<ApiTreeNode>;

const { indigo, background, blue, green, white } = theme;

const textTruncate: React.CSSProperties = {
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  textOverflow: "ellipsis",
};

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

  const { TooltipInPortal: ToolTip } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  });

  const { tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip();

  const handleMouseOver = useCallback(
    (event: React.MouseEvent) => {
      const coords = localPoint(event);
      showTooltip({
        tooltipLeft: coords?.x,
        tooltipTop: coords?.y,
      });
    },
    [showTooltip]
  );

  return (
    <Group
      top={node.y}
      left={node.x}
      onClick={() => handleClick(node)}
      className="cursor-pointer"
    >
      <rect
        onMouseOver={handleMouseOver}
        onMouseOut={hideTooltip}
        height={rectHeight}
        width={rectWidth}
        y={centerY}
        x={centerX}
        fill={background}
        stroke={blue}
        strokeWidth={1}
      />
      {tooltipOpen && (
        <ToolTip
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <div style={{ width: 200 }}>
            <p>
              <strong>Name: {node.data.name}</strong>
            </p>
            <p>Team: Commerce</p>
            <p style={textTruncate}>
              Description: Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Odit soluta totam quia at a fugiat exercitationem neque
              necessitatibus tempora reprehenderit.
            </p>
          </div>
        </ToolTip>
      )}
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

  const { TooltipInPortal: ToolTip } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  });

  const { tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip();

  const handleMouseOver = useCallback(
    (event: React.MouseEvent) => {
      const coords = localPoint(event);
      showTooltip({
        tooltipLeft: coords?.x,
        tooltipTop: coords?.y,
        // tooltipData: node?.data as ApiNode,
      });
    },
    [showTooltip]
  );

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
        onMouseOver={handleMouseOver}
        onMouseOut={hideTooltip}
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
      {tooltipOpen && (
        <ToolTip
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <div style={{ width: 200 }}>
            <p>
              <strong>Name: {node.data.name}</strong>
            </p>
            <p>Team: Commerce</p>
            <p style={textTruncate}>
              Description: Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Odit soluta totam quia at a fugiat exercitationem neque
              necessitatibus tempora reprehenderit.
            </p>
          </div>
        </ToolTip>
      )}
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
