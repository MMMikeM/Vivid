import { useRef, useEffect, useState } from "react";
import Graph from "./Graph";

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

  const updateDimensions = () => {
    if (ref.current) {
      setDimensions({
        width: Math.max(ref.current.clientWidth ?? 0, 1000),
        height: Math.max(ref.current.clientHeight ?? 0, 500),
      });
    }
  };

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div ref={ref} className="h-screen w-screen">
      <Graph width={dimensions.width} height={dimensions.height} />
    </div>
  );
}
