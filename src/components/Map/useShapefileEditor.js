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
  const editing = useRef(null);
  const loaded = useRef(false);

  const current = steps[activeStep];

  const beginEditing = useCallback(
    (stepIndex, drawId) => {
      const feature = draw?.getSnapshotFeature(drawId);
      if (!feature) return;
      editing.current = {
        stepIndex,
        drawId,
        backupGeometry: structuredClone(feature.geometry),
      };
      setActiveStep(stepIndex);
      setIsEdit(true);
    },
    [draw],
  );

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
      if (stepIndex < 0) return;
      if (editing.current?.drawId !== id) beginEditing(stepIndex, id);
    };
    draw.on("change", onChange);
    draw.on("select", onSelect);
    return () => {
      draw.off("change", onChange);
      draw.off("select", onSelect);
    };
  }, [draw, steps, beginEditing]);

  useEffect(() => {
    if (!map || !current) return;
    const feature = source.current.features[current.index];
    map.fitBounds(turf.bbox(feature), { padding: 40, duration: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, activeStep]);

  const startEdit = useCallback(() => {
    if (!draw || !current?.drawId) return;
    draw.setMode("select");
    draw.selectFeature(current.drawId);
    beginEditing(activeStep, current.drawId);
  }, [draw, current, activeStep, beginEditing]);

  const finishEditing = useCallback(() => {
    const target = editing.current;
    editing.current = null;
    if (draw) {
      if (target && draw.hasFeature(target.drawId)) {
        draw.deselectFeature(target.drawId);
      }
      draw.setMode("static");
    }
    setIsEdit(false);
    return target;
  }, [draw]);

  const saveEdits = useCallback(() => {
    const target = finishEditing();
    if (!draw || !target) return;
    const feature = draw.getSnapshotFeature(target.drawId);
    const step = steps[target.stepIndex];
    if (feature && step) {
      source.current.features[step.index] = {
        ...source.current.features[step.index],
        geometry: feature.geometry,
      };
    }
  }, [draw, steps, finishEditing]);

  const cancelEdits = useCallback(() => {
    const target = finishEditing();
    if (!draw || !target) return;
    if (draw.hasFeature(target.drawId)) {
      draw.updateFeatureGeometry(target.drawId, target.backupGeometry);
    }
  }, [draw, finishEditing]);

  const deleteArea = useCallback(() => {
    if (!current) return;
    if (draw && current.drawId && draw.hasFeature(current.drawId)) {
      draw.setMode("static");
      draw.removeFeatures([current.drawId]);
    }
    if (editing.current?.drawId === current.drawId) editing.current = null;
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
