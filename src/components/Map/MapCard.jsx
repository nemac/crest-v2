import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useMapEvents } from "react-leaflet";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

import LeafletMapContainer from "./LeafletMapContainer.jsx";
import ActiveTileLayers from "./ActiveTileLayers.jsx";
import BasemapLayer from "./BasemapLayer.jsx";
import ActionButtons from "./ActionButtons.jsx";

const ContentMapBox = styled(Box)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: "solid",
  borderWidth: "1px",
}));

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
    <ContentMapBox>
      <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
        {children}
        <ActiveTileLayers />
        <BasemapLayer map={map} />
        <MapEventsComponent />
      </LeafletMapContainer>
      <ActionButtons map={map} />
    </ContentMapBox>
  );
}

MapCard.propTypes = {
  map: PropTypes.object,
  setMap: PropTypes.func,
  mapEventHandlers: PropTypes.objectOf(PropTypes.func),
  children: PropTypes.node,
};
