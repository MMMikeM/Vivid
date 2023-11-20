import { useRef, useEffect, useState } from "react";
import Example from "./example";

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
    <div ref={ref} className="h-screen w-screen">
      <Example width={dimensions.width} height={dimensions.height} />
    </div>
  );
}
