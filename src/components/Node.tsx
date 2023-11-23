import React from "react";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { ApiTreeNode } from "../store/tree";
import { theme } from "../constants";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import WithTooltip from "./HOC/Tooltip";
import { handleClick } from "../utils/handleClick";
import { dialogProxy } from "../store/dialog";

export type HierarchyNode = HierarchyPointNode<ApiTreeNode>;

const { background, blue, white, green } = theme;

export function RootNode({ node }: { node: HierarchyNode }) {
  const { name } = node.data;

  return (
    <WithTooltip component={<>Root</>}>
      <Group
        top={node.y}
        left={node.x}
        onClick={() => handleClick(node)}
        className="cursor-pointer"
      >
        <circle r={12} fill="url('#lg')" />
        <Text
          fontSize={10}
          fontFamily="monospace"
          textAnchor="middle"
          verticalAnchor="middle"
          style={{ pointerEvents: "none" }}
          fill={white}
        >
          {name}
        </Text>
      </Group>
    </WithTooltip>
  );
}
export function ParentNode({ node }: { node: HierarchyNode }) {
  const [rectHeight, rectWidth] = [24, 120];
  const centerX = -rectWidth / 2;
  const centerY = -rectHeight / 2;

  const name = node.data.name.repeat(5);

  return (
    <WithTooltip component={<>Thing</>}>
      <Group
        top={node.y}
        left={node.x}
        onClick={() => {
          dialogProxy.open = true;
        }}
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
    </WithTooltip>
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

  const { name } = node.data;

  return (
    <WithTooltip component={<>hi Mike</>}>
      <Group
        className="cursor-pointer"
        top={node.y}
        left={node.x}
        style={{ cursor: "pointer !important" }}
        onClick={() => {
          dialogProxy.open = true;
        }}
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
        <Text
          textAnchor="middle"
          verticalAnchor="middle"
          scaleToFit
          fontFamily="monospace"
          style={{ pointerEvents: "none" }}
          fill={white}
        >
          {name}
        </Text>
      </Group>
    </WithTooltip>
  );
}
