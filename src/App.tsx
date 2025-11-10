import { useRive, StateMachineInput } from "@rive-app/react-canvas";
import { useEffect, useRef, useState } from "react";
import "./App.css";
const BASE_URL =
  "https://static.canva.com/web/riv/c8cefb7b49258078c162ec0c6a8626fd.riv";
export default function App() {
  const riveInputs = useRef<Record<string, StateMachineInput>>({});
  const [showFullRive, setShowFullRive] = useState(false);

  const { RiveComponent, rive } = useRive({
    src: BASE_URL,
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  // Grab inputs for the first Rive
  useEffect(() => {
    if (!rive) return;
    const inputs = rive.stateMachineInputs("State Machine 1");
    const inputMap: Record<string, StateMachineInput> = {};
    inputs.forEach((i) => {
      inputMap[i.name] = i;
    });
    riveInputs.current = inputMap;
  }, [rive]);
  console.log(riveInputs);

  // Handler for click → show fullscreen animation
  const handleClick = () => {
    setShowFullRive(true);
  };

  return (
    <div className="App">
      {/* ✅ Small button Rive */}
      <div
        style={{
          width: 120,
          height: 120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onMouseEnter={() => {
          if (riveInputs.current["onHover"])
            riveInputs.current["onHover"].value = true;
        }}
        onMouseLeave={() => {
          if (riveInputs.current["onHover"])
            riveInputs.current["onHover"].value = false;
        }}
        onMouseDown={() => {
          if (riveInputs.current["onMousedown"])
            riveInputs.current["onMousedown"].value = true;
        }}
        onMouseUp={() => {
          if (riveInputs.current["onMousedown"])
            riveInputs.current["onMousedown"].value = false;
          handleClick();
        }}
      >
        <RiveComponent style={{ width: 120, height: 120 }} />
      </div>

      {/* ✅ Fullscreen Rive overlay */}
      {showFullRive && (
        <FullscreenRive onClose={() => setShowFullRive(false)} />
      )}
    </div>
  );
}

export function FullscreenRive({ onClose }: { onClose: () => void }) {
  const { RiveComponent } = useRive({
    src: BASE_URL,
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      <div className="wDupLw" />
      <RiveComponent
        style={{
          width: "100vw",
          height: "100vh",
          background: "transparent",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
