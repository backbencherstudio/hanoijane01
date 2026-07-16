import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import React from "react";
import { useControls } from "react-zoom-pan-pinch";

const MapControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="tools absolute top-0 right-0 bg-white border flex z-10">
      <button className="px-4 py-2 border-r flex items-center justify-center cursor-pointer" type="button" onClick={() => zoomIn()}>
        <ZoomIn className="size-4 text-accent" />
      </button>
      <button className="px-4 py-2 border-r flex items-center justify-center cursor-pointer" type="button" onClick={() => zoomOut()}>
        <ZoomOut className="size-4 text-accent" />
      </button>
      <button className="px-4 py-2  flex items-center justify-center cursor-pointer" type="button" onClick={() => resetTransform()}>
        <RotateCcw className="size-4 text-accent"/>
      </button>
    </div>
  );
};

export default MapControls;
