import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useMapEvents } from "react-leaflet";
import LeafletMapContainer from "./LeafletMapContainer.jsx";
import ActiveTileLayers from "./ActiveTileLayers.jsx";
import BasemapLayer from "./BasemapLayer.jsx";

export default function MapCard({ children, map, setMap, mapEventHandlers }) {
  const selectedCenterSelector = (state) => state.mapProperties.center;
  const selectedZoomSelector = (state) => state.mapProperties.zoom;
  const listVisibleSelector = (state) => state.mapLayerList.visible;
  const areaVisibleSelector = (state) => state.mapProperties.areaVisible;
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const layerListVisible = useSelector(listVisibleSelector);
  const areaVisible = useSelector(areaVisibleSelector);

  useEffect(() => {
    let timer;
    if (map) {
      timer = setTimeout(() => map.invalidateSize(), 10);
    }
    return () => clearTimeout(timer);
  }, [map, areaVisible, layerListVisible]);

  // This component exists solely for the useMapEvents hook
  const MapEventsComponent = () => {
    useMapEvents(mapEventHandlers);
    return null;
  };

  return (
    <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
      {children}
      <ActiveTileLayers />
      <BasemapLayer map={map} />
      <MapEventsComponent />
    </LeafletMapContainer>
  );
}

MapCard.propTypes = {
  map: PropTypes.object,
  setMap: PropTypes.func,
  mapEventHandlers: PropTypes.objectOf(PropTypes.func),
  children: PropTypes.node,
};
