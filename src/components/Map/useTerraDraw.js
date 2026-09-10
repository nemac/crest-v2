import { useEffect, useState } from "react";
import {
  TerraDraw,
  TerraDrawPolygonMode,
  TerraDrawSelectMode,
  ValidateNotSelfIntersecting,
} from "terra-draw";
import { TerraDrawMapLibreGLAdapter } from "terra-draw-maplibre-gl-adapter";

export const SKETCH_COLOR = "#3388ff";

export const notSelfIntersecting = (feature) =>
  ValidateNotSelfIntersecting(feature);

export const createSketchModes = () => [
  new TerraDrawPolygonMode({
    validation: notSelfIntersecting,
    styles: {
      fillColor: SKETCH_COLOR,
      fillOpacity: 0.2,
      outlineColor: SKETCH_COLOR,
      outlineWidth: 3,
      closingPointColor: "#ffffff",
      closingPointWidth: 6,
      closingPointOutlineColor: SKETCH_COLOR,
      closingPointOutlineWidth: 2,
    },
  }),
  new TerraDrawSelectMode({
    flags: {
      polygon: {
        feature: {
          draggable: false,
          coordinates: { midpoints: true, draggable: true, deletable: true },
        },
      },
    },
  }),
];

// A basemap swap replaces the style, which drops terra-draw's layers, so rebuild them from a snapshot.
const restoreAfterStyleChange = (draw) => {
  const snapshot = draw.getSnapshot();
  const mode = draw.getMode();
  try {
    draw.stop();
  } catch (error) {
    // The style swap may already have removed terra-draw's sources.
  }
  draw.start();
  draw.clear();
  if (snapshot.length > 0) draw.addFeatures(snapshot);
  draw.setMode(mode);
};

export default function useTerraDraw(map, createModes) {
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    if (!map) return undefined;
    const instance = new TerraDraw({
      adapter: new TerraDrawMapLibreGLAdapter({ map }),
      modes: createModes(),
    });
    instance.start();
    const onStyleLoad = () => restoreAfterStyleChange(instance);
    map.on("style.load", onStyleLoad);
    setDraw(instance);
    return () => {
      map.off("style.load", onStyleLoad);
      try {
        instance.stop();
      } catch (error) {
        // The map may already be removed when the page unmounts.
      }
      setDraw(null);
    };
  }, [map, createModes]);

  return draw;
}
