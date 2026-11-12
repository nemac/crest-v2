import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Popup } from "@vis.gl/react-maplibre";
import PropTypes from "prop-types";
import * as turf from "@turf/turf";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import AddchartIcon from "@mui/icons-material/Addchart";

import { addSearchPlacesGeoJSON } from "../../reducers/mapPropertiesSlice";
import { agolApiKey } from "../../configuration/config";
import { suggestPlaces, findCandidate } from "../../services/arcgisGeocode";
import SearchToggleButton from "./SearchToggleButton.jsx";

const MIN_QUERY_LENGTH = 3;
const STATISTICS_RADIUS_METERS = 1000;
const SEARCH_LABEL = "Search for places or addresses";

const collapsedWrapperStyle = {
  display: "flex",
  marginTop: 1,
};

const expandedWrapperStyle = {
  ...collapsedWrapperStyle,
  width: 290,
  maxWidth: "calc(100vw - 20px)",
  backgroundColor: "#FFFFFF",
  borderRadius: 1,
};

const autocompleteStyle = {
  flex: 1,
  "& .MuiInputBase-input": { color: "#000000" },
  "& .MuiInputBase-input::placeholder": { color: "#595959", opacity: 1 },
  "& .MuiAutocomplete-clearIndicator": { color: "#000000" },
};

export default function SearchPlaces({ map, statisticsDisabled }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const latestRequest = useRef(0);
  const buttonRef = useRef(null);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleInputKeyDown = (event) => {
    if (event.key !== "Escape") return;
    setExpanded(false);
    buttonRef.current.focus();
  };

  const handleInputBlur = (event) => {
    // Clicking the toggle button handles collapsing by itself.
    if (event.relatedTarget === buttonRef.current) return;
    if (inputValue === "") setExpanded(false);
  };

  const handleInputChange = (_, value, reason) => {
    // On mount MUI sends an empty reset, which would wipe text kept from before.
    const isEmptyReset = reason === "reset" && value === "";
    if (!isEmptyReset) setInputValue(value);
    if (reason === "reset") return;
    latestRequest.current += 1;
    const requestId = latestRequest.current;
    if (reason !== "input" || value.length < MIN_QUERY_LENGTH) {
      setOptions([]);
      return;
    }
    suggestPlaces(value, agolApiKey)
      .then((suggestions) => {
        if (requestId === latestRequest.current) setOptions(suggestions);
      })
      .catch(() => {
        if (requestId === latestRequest.current) setOptions([]);
      });
  };

  const handleSelect = (_, suggestion) => {
    if (!suggestion) return;
    findCandidate(suggestion, agolApiKey)
      .then((candidate) => {
        if (!candidate) return;
        const { x: lng, y: lat } = candidate.location;
        setResult({ text: candidate.address, lng, lat });
        if (map && candidate.extent) {
          const { xmin, ymin, xmax, ymax } = candidate.extent;
          map.fitBounds([xmin, ymin, xmax, ymax]);
        }
      })
      .catch(() => null);
  };

  const handleGetAreaStatistics = () => {
    const circle = turf.circle(
      [result.lng, result.lat],
      STATISTICS_RADIUS_METERS,
      {
        steps: 32,
        units: "meters",
      },
    );
    dispatch(addSearchPlacesGeoJSON(circle));
    setResult(null);
  };

  return (
    <>
      <Box sx={expanded ? expandedWrapperStyle : collapsedWrapperStyle}>
        {expanded && (
          <Autocomplete
            size="small"
            options={options}
            filterOptions={(all) => all}
            getOptionLabel={(option) => option.text}
            isOptionEqualToValue={(option, value) =>
              option.magicKey === value.magicKey
            }
            inputValue={inputValue}
            clearOnBlur={false}
            forcePopupIcon={false}
            onInputChange={handleInputChange}
            onChange={handleSelect}
            onKeyDown={handleInputKeyDown}
            noOptionsText="Type at least three characters"
            sx={autocompleteStyle}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                placeholder={SEARCH_LABEL}
                inputProps={{
                  ...params.inputProps,
                  "aria-label": SEARCH_LABEL,
                  onBlur: (event) => {
                    params.inputProps.onBlur(event);
                    handleInputBlur(event);
                  },
                }}
              />
            )}
          />
        )}
        <SearchToggleButton
          ref={buttonRef}
          expanded={expanded}
          onToggle={handleToggle}
        />
      </Box>
      {result && (
        <Popup
          longitude={result.lng}
          latitude={result.lat}
          anchor="bottom"
          onClose={() => setResult(null)}
        >
          <div style={{ color: "#000000" }}>
            <h2>{result.text}</h2>
            {!statisticsDisabled && (
              <p>
                <Button
                  variant="contained"
                  color="CRESTPrimary"
                  onClick={handleGetAreaStatistics}
                >
                  <AddchartIcon /> Get Statistics for this location
                </Button>
              </p>
            )}
          </div>
        </Popup>
      )}
    </>
  );
}

SearchPlaces.propTypes = {
  map: PropTypes.object,
  statisticsDisabled: PropTypes.bool,
};
