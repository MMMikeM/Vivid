import { useState, cloneElement, ReactElement } from "react";
import { useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";

type ToolTipProps = {
  component: ReactElement;
  children: ReactElement;
};

const WithTooltip = ({ children, component }: ToolTipProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipCoords, setTooltipCoords] = useState({ top: 0, left: 0 });
  const { TooltipInPortal } = useTooltipInPortal({ detectBounds: true });

  const handleMouseOver = (event: MouseEvent) => {
    const coords = localPoint(event) || { x: 0, y: 0 };
    setTooltipCoords({ top: coords.y, left: coords.x });
    setTooltipOpen(true);
  };

  const handleMouseOut = () => {
    setTooltipOpen(false);
  };

  const childWithTooltip = cloneElement(children, {
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
  });

  return (
    <>
      {childWithTooltip}
      {tooltipOpen && (
        <TooltipInPortal {...tooltipCoords}>{component}</TooltipInPortal>
      )}
    </>
  );
};

export default WithTooltip;
