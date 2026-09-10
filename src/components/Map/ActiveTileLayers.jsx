import React from "react";
import { useSelector } from "react-redux";
import { Source, Layer } from "@vis.gl/react-maplibre";
import { mapConfig } from "../../configuration/config";
import { layerSourceSpec, layerSpec } from "./layerSources";

const selectedRegionSelector = (state) => state.selectedRegion.value;
const activeLayerListSelector = (state) => state.mapLayerList.activeLayerList;

export default function ActiveTileLayers() {
  const selectedRegion = useSelector(selectedRegionSelector);
  const regionName = mapConfig.regions[selectedRegion].regionName;
  const layerList = useSelector(activeLayerListSelector);

  return Object.values(layerList)
    .filter((lyr) => lyr.region === regionName)
    .map((lyr) => (
      <Source key={lyr.id} id={`source-${lyr.id}`} {...layerSourceSpec(lyr)}>
        <Layer {...layerSpec(lyr)} />
      </Source>
    ));
}
