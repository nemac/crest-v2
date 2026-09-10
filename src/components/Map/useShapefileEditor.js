import { useCallback, useEffect, useRef, useState } from "react";
import * as turf from "@turf/turf";
import { TerraDrawPolygonMode, TerraDrawSelectMode } from "terra-draw";
import { notSelfIntersecting } from "./useTerraDraw";
import {
  buildSteps,
  applyGeometryChange,
  markDeleted,
  finalFeatureCollection,
} from "./shapefileCorrection";
import { validPolygon } from "../../utility/utilityFunctions";

const VALID_COLOR = "#00cc44";
const INVALID_COLOR = "#ff0000";
const validityColor = (feature) =>
  feature.properties.valid ? VALID_COLOR : INVALID_COLOR;

export const createCorrectionModes = () => [
  new TerraDrawPolygonMode({
    styles: {
      fillColor: validityColor,
      fillOpacity: 0.2,
      outlineColor: validityColor,
      outlineWidth: 3,
    },
  }),
  new TerraDrawSelectMode({
    flags: {
      polygon: {
        feature: {
          draggable: false,
          validation: notSelfIntersecting,
          coordinates: { midpoints: true, draggable: true, deletable: true },
        },
      },
    },
    styles: {
      selectedPolygonColor: validityColor,
      selectedPolygonFillOpacity: 0.2,
      selectedPolygonOutlineColor: validityColor,
      selectedPolygonOutlineWidth: 3,
      selectionPointColor: "#ffffff",
      selectionPointOutlineColor: "#000000",
      selectionPointWidth: 6,
      selectionPointOutlineWidth: 1,
      midPointColor: "#ffffff",
      midPointOutlineColor: "#3388ff",
      midPointWidth: 4,
      midPointOutlineWidth: 1,
    },
  }),
];

// terra-draw rejects coordinates with more than nine decimals.
const toDrawFeature = (feature) =>
  turf.truncate(
    {
      type: "Feature",
      geometry: feature.geometry,
      properties: { mode: "polygon", valid: false },
    },
    { precision: 9, coordinates: 2 },
  );

export default function useShapefileEditor(map, draw, geoToRedraw) {
  const source = useRef(geoToRedraw);
  const [steps, setSteps] = useState(() => buildSteps(geoToRedraw));
  const [activeStep, setActiveStep] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const editBackup = useRef(null);
  const loaded = useRef(false);

  const current = steps[activeStep];

  useEffect(() => {
    if (!draw || loaded.current || steps.length === 0) return;
    loaded.current = true;
    const results = draw.addFeatures(
      steps.map((step) => toDrawFeature(source.current.features[step.index])),
    );
    setSteps((previous) =>
      previous.map((step, i) => ({
        ...step,
        drawId: results[i].valid ? results[i].id : null,
      })),
    );
  }, [draw, steps]);

  useEffect(() => {
    if (!draw) return undefined;
    const onChange = (ids, type, context) => {
      if (type !== "update" || context?.target === "properties") return;
      setSteps((previous) =>
        previous.map((step) => {
          if (!ids.includes(step.drawId)) return step;
          const feature = draw.getSnapshotFeature(step.drawId);
          return feature ? applyGeometryChange(step, feature.geometry) : step;
        }),
      );
      ids.forEach((id) => {
        const feature = draw.getSnapshotFeature(id);
        if (!feature) return;
        const valid = validPolygon(feature);
        if (Boolean(feature.properties.valid) !== valid) {
          draw.updateFeatureProperties(id, { valid });
        }
      });
    };
    const onSelect = (id) => {
      const stepIndex = steps.findIndex((step) => step.drawId === id);
      if (stepIndex >= 0) {
        setActiveStep(stepIndex);
        setIsEdit(true);
      }
    };
    draw.on("change", onChange);
    draw.on("select", onSelect);
    return () => {
      draw.off("change", onChange);
      draw.off("select", onSelect);
    };
  }, [draw, steps]);

  useEffect(() => {
    if (!map || !current) return;
    const feature = source.current.features[current.index];
    map.fitBounds(turf.bbox(feature), { padding: 40, duration: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, activeStep]);

  const startEdit = useCallback(() => {
    if (!draw || !current?.drawId) return;
    editBackup.current = structuredClone(
      draw.getSnapshotFeature(current.drawId),
    );
    draw.setMode("select");
    draw.selectFeature(current.drawId);
    setIsEdit(true);
  }, [draw, current]);

  const finishEditing = useCallback(() => {
    if (!draw) return;
    if (current?.drawId && draw.hasFeature(current.drawId)) {
      draw.deselectFeature(current.drawId);
    }
    draw.setMode("static");
    setIsEdit(false);
  }, [draw, current]);

  const saveEdits = useCallback(() => {
    if (draw && current?.drawId) {
      const feature = draw.getSnapshotFeature(current.drawId);
      if (feature) {
        source.current.features[current.index] = {
          ...source.current.features[current.index],
          geometry: feature.geometry,
        };
      }
    }
    finishEditing();
  }, [draw, current, finishEditing]);

  const cancelEdits = useCallback(() => {
    if (draw && current?.drawId && editBackup.current) {
      draw.updateFeatureGeometry(current.drawId, editBackup.current.geometry);
    }
    finishEditing();
  }, [draw, current, finishEditing]);

  const deleteArea = useCallback(() => {
    if (!current) return;
    if (draw && current.drawId && draw.hasFeature(current.drawId)) {
      draw.setMode("static");
      draw.removeFeatures([current.drawId]);
    }
    setSteps((previous) =>
      previous.map((step, i) => (i === activeStep ? markDeleted(step) : step)),
    );
    setIsEdit(false);
  }, [draw, current, activeStep]);

  const completedCollection = useCallback(
    () => finalFeatureCollection(source.current, steps),
    [steps],
  );

  return {
    steps,
    activeStep,
    setActiveStep,
    isEdit,
    numberInvalid: steps.length,
    numberNotFixed: steps.filter((step) => !step.isFixed).length,
    startEdit,
    saveEdits,
    cancelEdits,
    deleteArea,
    completedCollection,
  };
}
