import React, { useEffect, useRef, useState } from "react";
import Graph from "./Graph";
import { Drawer } from "./components/Drawer";

import { EditDialog } from "./components/EditDialog";

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

  const updateDimensions = () => {
    if (ref.current) {
      setDimensions({
        width: ref.current.clientWidth ?? 0,
        height: ref.current.clientHeight ?? 0,
      });
    }
  };

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div>
      <EditDialog />
      <div ref={ref} className="h-screen w-screen overflow-hidden">
        <Drawer />
        <Graph width={dimensions.width} height={dimensions.height} />
      </div>
    </div>
  );
}
