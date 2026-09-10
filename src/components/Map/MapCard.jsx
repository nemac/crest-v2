import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import MapLibreMapContainer from "./MapLibreMapContainer.jsx";
import ActiveTileLayers from "./ActiveTileLayers.jsx";

const selectedCenterSelector = (state) => state.mapProperties.center;
const selectedZoomSelector = (state) => state.mapProperties.zoom;

export default function MapCard(props) {
  const {
    children,
    setMap,
    mapEventHandlers = {},
    interactiveLayerIds,
    cursor,
  } = props;
  // "() => true" reads the persisted view once so map moves never re-render the card
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);

  return (
    <MapLibreMapContainer
      center={center}
      zoom={zoom}
      setMap={setMap}
      interactiveLayerIds={interactiveLayerIds}
      cursor={cursor}
      {...mapEventHandlers}
    >
      <ActiveTileLayers />
      {children}
    </MapLibreMapContainer>
  );
}

MapCard.propTypes = {
  children: PropTypes.node,
  setMap: PropTypes.func,
  mapEventHandlers: PropTypes.objectOf(PropTypes.func),
  interactiveLayerIds: PropTypes.arrayOf(PropTypes.string),
  cursor: PropTypes.string,
};
