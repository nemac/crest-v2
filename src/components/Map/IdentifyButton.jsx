import React from "react";
import { createRoot } from "react-dom/client";
import * as L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch } from "react-redux";
import {
  changeIdentifyCoordinates,
  changeIdentifyIsLoaded,
  changeIdentifyResults,
} from "../../reducers/mapPropertiesSlice";

const createIdentifyButonControl = (props) => {
  const { handler } = props;
  const identifyButtonStyle = {
    minHeight: "30px",
    minWidth: "30px",
    width: "30px",
    height: "30px",
    color: "#000000",
    backgroundColor: "#FFFFFF",
  };
  const control = L.control({ position: "topleft" });

  control.onAdd = () => {
    const container = L.DomUtil.create("div", "");
    const root = createRoot(container);

    root.render(
      <Button variant="contained" onClick={handler} style={identifyButtonStyle}>
        <InfoIcon />
      </Button>,
    );

    return container;
  };

  return control;
};

const IdentifyButton = createControlComponent(createIdentifyButonControl);

export default function IdentifyButtonWrapper(props) {
  const { map } = props;
  const dispatch = useDispatch();

  const identifyClickHandler = (e) => {
    e.stopPropagation();
    map.getContainer().style.cursor = "crosshair";
    map.once("click", (event) => {
      const coordinates = event.latlng;
      dispatch(changeIdentifyIsLoaded(false));
      dispatch(
        changeIdentifyCoordinates({
          lat: coordinates.lat,
          lng: coordinates.lng,
        }),
      );
      dispatch(changeIdentifyResults(null));
      map.getContainer().style.cursor = "grab";
    });
  };

  if (!map) {
    return null;
  }

  return <IdentifyButton handler={identifyClickHandler} />;
}

IdentifyButtonWrapper.propTypes = {
  map: PropTypes.object,
};
