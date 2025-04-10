import React, { useState } from "react";
import ReactGA from "react-ga4";

import { useDispatch, useSelector } from "react-redux";
import * as esri from "esri-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SearchOutlined, HelpOutlineOutlined } from "@mui/icons-material"; // for when we need it, Search } from '@mui/icons-material';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { addNewFeatureToDrawnLayers } from "../../reducers/mapPropertiesSlice";
import { mapConfig } from "../../configuration/config";
import { convertDataForZonalStats } from "../../utility/utilityFunctions";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#F8F9FA",
    color: "#000000",
    boxShadow: theme.shadows[1],
    border: "1px solid #2c2c2c",
    fontSize: "0.75rem",
  },
}));

// Custom theme for search by area
const customAutoCompleteTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          padding: "0px !important",
          margin: "0px !important",
          width: "100%",
          "&::before": {
            borderBottom: "0px none transparent",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "0px none transparent",
          },
          "&.Mui-focused:after": {
            borderBottom: "0px none transparent",
          },
          "&.Mui-endAdorment": {
            color: "#000000",
          },
          "& svg": {
            color: "#000000",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          padding: "0px !important",
          margin: "0px !important",
          "--TextField-brandBorderColor": "transparent",
          "--TextField-brandBorderHoverColor": "transparent",
          "--TextField-brandBorderFocusedColor": "transparent",
          "& label.Mui-focused": {
            color: "#000000",
            cursor: "pointer",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          color: "lightblue",
          fontSize: "0.875rem",
          fontWeight: "500",
          borderBottom: "none",
          padding: "0px !important",
          margin: "0px !important",
          '& [type="search"]::-webkit-search-cancel-button': {
            WebkitAppearance: "none",
            appearance: "none",
            backgroundImage: "none",
            padding: "0px !important",
            margin: "0px !important",
          },
          "& .MuiInputLabel-root": {
            cursor: "pointer",
            position: "unset",
            color: "#000000",
            fontSize: "0.875rem",
            fontWeight: "500",
            padding: "0px !important",
            margin: "0px !important",
          },
          // label helper when typing or text entered
          "& .MuiInputLabel-root.MuiInputLabel-shrink": {
            color: "#858585",
            transform: "translate(0, 12px) scale(0.55)",
            transformOrigin: "top right",
          },
        },
        input: {
          width: "100%",
          cursor: "pointer",
          color: "#000000",
          fontSize: "0.875rem",
          fontWeight: "500",
          padding: "0px !important",
          margin: "0px !important",
        },
        inputFocused: {
          // when typing
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: "pointer",
          color: "#000000",
          padding: "0px !important",
          margin: "0px !important",
        },
        clearIndicator: {
          color: "#000000",
          fontSize: "0.875rem",
          padding: "0px !important",
          margin: "0px !important",
          "&:hover": {
            backgroundColor: "#c5c6c7",
            fontSize: "0.875rem",
            padding: "0px !important",
            margin: "0px !important",
          },
        },
        popupIndicator: {
          fontSize: "0.875rem",
          padding: "0px !important",
          margin: "0px !important",
        },
        popupIndicatorOpen: {
          fontSize: "0.875rem",
          padding: "0px !important",
          margin: "0px !important",
        },
        inputAdornedEnd: {
          fontSize: "0.875rem",
          padding: "0px !important",
          margin: "0px !important",
        },
        noOptions: {
          // no options
          backgroundColor: "#0a0a0a",
          color: "#FFFFFF",
          border: `1px solid #555555`,
          fontSize: "0.875rem",
          fontWeight: "500",
          whiteSpace: "pre-line",
        },
        popper: {
          inset: "8px auto auto 0px !important",
        },
      },
    },
  },
});

const StyledSearchBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "flex-end",
  backgroundColor: "#F8F9FA",
  color: "#000000",
  height: "36px",
  padding: "8px 16px !important",
  margin: "0px !important",
  borderRadius: theme.spacing(0.75),
}));

const selectedRegionSelector = (state) => state.selectedRegion.value;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;

export default function SearchCustom(props) {
  const { map } = props;
  const dispatch = useDispatch();
  const selectedRegion = useSelector(selectedRegionSelector);
  const drawnLayers = useSelector(drawnLayersSelector);

  const regionConfig = mapConfig.regions[selectedRegion];
  const [open, setOpen] = React.useState(false);
  const [aPlaceFound, setAPlaceFound] = React.useState(false);
  const [thePlaceFound, setThePlaceFound] = React.useState("");
  const [options, setOptions] = useState([]);
  const [noOptionsText, setNoOptionsText] = useState("Nothing to search yet");

  const allFeatureLayer = esri.featureLayer({
    url: "https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/CREST_SEARCH/FeatureServer/0",
  });

  const allQuery = allFeatureLayer.query();
  // Send query to arcgis and draw the state, county, or huc8 on the map
  const runQuerySearching = (query) => {
    setAPlaceFound(false);
    query.run((error, featureCollection, response) => {
      if (error) {
        return;
      }
      if (featureCollection.features.length === 0) {
        return;
      }
      setOptions(featureCollection.features);
    });
  };

  const onHandleSearchChange = (_, feature) => {
    if (feature === null) {
      return;
    }

    setAPlaceFound(true);
    setThePlaceFound(
      `Found an an area matching "${feature.properties.search_field}"`,
    );
    // check for custom area already added
    const isFeatureAdded = drawnLayers.features.filter(
      (key) => key.properties.search_field === feature.properties.search_field,
    );
    if (isFeatureAdded.length > 0) return;
    // eslint-disable-next-line no-param-reassign
    feature.properties.NAME = feature.properties.search_field;
    // eslint-disable-next-line no-param-reassign
    feature.properties.areaName = feature.properties.search_field;
    // eslint-disable-next-line no-param-reassign
    feature.properties.region = feature.properties.region.replace(
      "Mexico",
      "America",
    );
    const zonalStatsKeys = regionConfig.zonalStatsKeys;
    const geoToDraw = convertDataForZonalStats(feature, zonalStatsKeys);
    map.fitBounds(L.geoJSON(geoToDraw).getBounds());
    dispatch(addNewFeatureToDrawnLayers(geoToDraw));
  };

  const handleInputChange = (_, newInputValue) => {
    const tempRegion = selectedRegion
      .replace("'", "''")
      .replace("America", "Mexico");
    if (newInputValue.length < 3) {
      setOpen(false);
      setAPlaceFound(false);
    } else {
      allQuery.where(
        `search_field LIKE '%${newInputValue}%' AND region = '${tempRegion}'`,
      );
      ReactGA.event({
        category: "engagement",
        action: "add_area_search",
        label: newInputValue,
      });
      const warningText = `CREST includes coastal areas only! "${newInputValue}" may be outside a coastal zone or not in the current region. `;
      const optionText = (
        <Alert
          severity="warning"
          sx={{
            backgroundColor: "rgba(255, 165, 0, 0.1)",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          {" "}
          {warningText}
        </Alert>
      );
      //  `CREST only includes coastal areas! "${newInputValue}" may be outside a coastal zone or not in the current region: '${selectedRegion.replace("'", "''")}'`
      setNoOptionsText(optionText);
      runQuerySearching(allQuery);
      setOpen(true);
      setAPlaceFound(false);
    }
  };

  const renderInput = (params) => (
    <StyledSearchBox>
      <SearchOutlined
        sx={{
          fontSize: "20px",
          color: "#000000",
          padding: "0px",
          marginRight: "8px",
        }}
      />
      <TextField
        sx={{ margin: "0px", padding: "0px" }}
        fullWidth
        {...params}
        label="Search for a State, County, or Watershed (HUC-8)"
        aria-label={"Search for a State, County, or Watershed"}
        id="search-area-textfield"
        variant="standard"
        type="search"
      />
      <LightTooltip title={aPlaceFound ? thePlaceFound : noOptionsText}>
        <HelpOutlineOutlined
          sx={{
            fontSize: "20px",
            color: "#000000",
            padding: "0px",
            margin: "0px",
          }}
        />
      </LightTooltip>
    </StyledSearchBox>
  );

  return (
    <Box p={0.75}>
      <ThemeProvider theme={customAutoCompleteTheme}>
        <Autocomplete
          id="search-area-autocomplete"
          fullWidth
          autoComplete={true}
          autoHighlight={true}
          open={open}
          options={options}
          isOptionEqualToValue={(option, value) =>
            option.properties.search_field === value.properties.search_field
          }
          onClose={() => setOpen(false)}
          // getOptionLabel={(option) => `${option.properties.search_field} - (${option.properties.source.toUpperCase()})`}
          getOptionLabel={(option) =>
            option.properties.search_field.replace("Hawaii", "Hawai'i")
          }
          getOptionKey={(option) => option.properties.fid}
          noOptionsText={noOptionsText}
          clearOnBlur={false}
          onChange={onHandleSearchChange}
          onInputChange={handleInputChange}
          renderInput={renderInput}
        />
      </ThemeProvider>
    </Box>
  );
}
SearchCustom.propTypes = {
  map: PropTypes.object,
};
