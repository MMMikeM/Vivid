import { LinearGradient } from "@visx/gradient";
import { Group } from "@visx/group";
import { Tree, hierarchy } from "@visx/hierarchy";
import { LinkVerticalLine } from "@visx/shape";
import { Zoom } from "@visx/zoom";
import { useSnapshot } from "valtio";
import { Node } from "./components/Node";
import { theme } from "./constants";
import { ApiTreeNode, dictProxy, dictToTree } from "./store/tree";

const { background, lightpurple, orange, pink } = theme;

const defaultMargin = { x: 80, y: 80 };

export type TreeProps = {
  width: number;
  height: number;
  margin?: { x: number; y: number };
};

export default function Graph({
  width,
  height,
  margin = defaultMargin,
}: TreeProps) {
  const renderWidth = Math.max(width, 1920);
  const renderHeight = Math.max(height, 1080);

  const yMax = renderWidth - 2 * margin.y;
  const xMax = renderHeight - 2 * margin.x;

  const snapshot = useSnapshot(dictProxy);
  const data = hierarchy(dictToTree(snapshot));

  if (width < 10) return null;

  return (
    <Zoom
      width={renderWidth}
      height={renderHeight}
      scaleXMin={0.2}
      scaleXMax={2}
      scaleYMin={0.2}
      scaleYMax={2}
    >
      {(zoom) => (
        <svg
          className="z-10"
          width={renderWidth}
          height={renderHeight}
          style={{
            cursor: zoom.isDragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
          onWheel={zoom.handleWheel}
          onMouseDown={zoom.dragStart}
          onMouseMove={zoom.dragMove}
          onMouseUp={zoom.dragEnd}
          onMouseLeave={() => {
            if (zoom.isDragging) zoom.dragEnd();
          }}
        >
          <LinearGradient id="lg" from={orange} to={pink} />
          <rect width={width} height={height} fill={background} />
          <g transform={zoom.toString()}>
            <Tree<ApiTreeNode>
              root={data}
              size={[xMax, yMax]}
              nodeSize={[400, 500]}
              separation={(a, b) => {
                const siblings = a.parent?.children?.length ?? 0;
                if (a.children) return 2;
                if (b.children) return 2;
                return siblings > 2 ? 1 : 5;
              }}
            >
              {(tree) => (
                <Group top={margin.x} left={margin.y}>
                  {tree.links().map((link, i) => (
                    <LinkVerticalLine
                      key={`link-${i}`}
                      data={link}
                      stroke={lightpurple}
                      strokeWidth="1"
                      fill="none"
                    />
                  ))}
                  {tree.descendants().map((node) => (
                    <Node key={`node-${node.data.id}`} node={node} />
                  ))}
                </Group>
              )}
            </Tree>
          </g>
        </svg>
      )}
    </Zoom>
  );
}
