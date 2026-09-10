import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Popup } from "@vis.gl/react-maplibre";
import PropTypes from "prop-types";
import * as turf from "@turf/turf";
import { Autocomplete, Button, TextField } from "@mui/material";
import AddchartIcon from "@mui/icons-material/Addchart";
import SearchIcon from "@mui/icons-material/Search";

import { addSearchPlacesGeoJSON } from "../../reducers/mapPropertiesSlice";
import { agolApiKey } from "../../configuration/config";
import { suggestPlaces, findCandidate } from "../../services/arcgisGeocode";

const MIN_QUERY_LENGTH = 3;
const STATISTICS_RADIUS_METERS = 1000;

export default function SearchPlaces({ map, statisticsDisabled }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(null);
  const latestRequest = useRef(0);

  const handleInputChange = (_, value, reason) => {
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
      <Autocomplete
        size="small"
        options={options}
        filterOptions={(all) => all}
        getOptionLabel={(option) => option.text}
        isOptionEqualToValue={(option, value) =>
          option.magicKey === value.magicKey
        }
        onInputChange={handleInputChange}
        onChange={handleSelect}
        noOptionsText="Type at least three characters"
        sx={{
          width: 260,
          marginTop: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: 1,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for a place"
            aria-label="Search for a place"
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon sx={{ color: "#000000", mr: 0.5 }} />,
            }}
          />
        )}
      />
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
