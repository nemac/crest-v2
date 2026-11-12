import React from "react";
import { useSelector } from "react-redux";
import { Source, Layer } from "@vis.gl/react-maplibre";
import { mapConfig } from "../../configuration/config";
import {
  layerSourceSpec,
  layerSpec,
  resolveActiveLayers,
} from "./layerSources";

const selectedRegionSelector = (state) => state.selectedRegion.value;
const activeLayerListSelector = (state) => state.mapLayerList.activeLayerList;

export default function ActiveTileLayers() {
  const selectedRegion = useSelector(selectedRegionSelector);
  const regionLayers = mapConfig.regions[selectedRegion].layerList;
  const activeLayerList = useSelector(activeLayerListSelector);

  return resolveActiveLayers(activeLayerList, regionLayers).map((lyr) => (
    <Source key={lyr.id} id={`source-${lyr.id}`} {...layerSourceSpec(lyr)}>
      <Layer {...layerSpec(lyr)} />
    </Source>
  ));
}
