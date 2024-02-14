import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as esri from 'esri-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SearchOutlined } from '@mui/icons-material'; // for when we need it, Search } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { addNewFeatureToDrawnLayers } from '../../reducers/mapPropertiesSlice';
import { mapConfig } from '../../configuration/config';
import { convertDataForZonalStats } from '../../utility/utilityFunctions';

// Custom theme for search by area
const customAutoCompleteTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          padding: '0px !important',
          margin: '0px !important',
          width: '100%',
          '&::before': {
            borderBottom: '0px none transparent'
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: '0px none transparent'
          },
          '&.Mui-focused:after': {
            borderBottom: '0px none transparent'
          },
          '&.Mui-endAdorment': {
            color: '#000000'
          },
          '& svg': {
            color: '#000000'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          padding: '0px !important',
          margin: '0px !important',
          '--TextField-brandBorderColor': 'transparent',
          '--TextField-brandBorderHoverColor': 'transparent',
          '--TextField-brandBorderFocusedColor': 'transparent',
          '& label.Mui-focused': {
            color: '#000000',
            cursor: 'pointer'
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          color: 'lightblue',
          fontSize: '0.875rem',
          fontWeight: '500',
          borderBottom: 'none',
          padding: '0px !important',
          margin: '0px !important',
          '& [type="search"]::-webkit-search-cancel-button': {
            WebkitAppearance: 'none',
            appearance: 'none',
            backgroundImage: 'none',
            padding: '0px !important',
            margin: '0px !important'
          },
          '& .MuiInputLabel-root': {
            cursor: 'pointer',
            position: 'unset',
            color: '#000000',
            fontSize: '0.875rem',
            fontWeight: '500',
            padding: '0px !important',
            margin: '0px !important'
          },
          // label helper when typing or text entered
          '& .MuiInputLabel-root.MuiInputLabel-shrink': {
            color: '#858585',
            transform: 'translate(0, 12px) scale(0.55)',
            transformOrigin: 'top right'
          }
        },
        input: {
          width: '100%',
          cursor: 'pointer',
          color: '#000000',
          fontSize: '0.875rem',
          fontWeight: '500',
          padding: '0px !important',
          margin: '0px !important'
        },
        inputFocused: { // when typing
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          color: '#000000',
          padding: '0px !important',
          margin: '0px !important'
        },
        clearIndicator: {
          color: '#000000',
          fontSize: '0.875rem',
          padding: '0px !important',
          margin: '0px !important',
          '&:hover': {
            backgroundColor: '#c5c6c7',
            fontSize: '0.875rem',
            padding: '0px !important',
            margin: '0px !important'
          }
        },
        popupIndicator: {
          fontSize: '0.875rem',
          padding: '0px !important',
          margin: '0px !important'
        },
        popupIndicatorOpen: {
          fontSize: '0.875rem',
          padding: '0px !important',
          margin: '0px !important'
        },
        inputAdornedEnd: {
          fontSize: '0.875rem',
          padding: '0px !important',
          margin: '0px !important'
        },
        noOptions: { // no options
          color: '#000000',
          fontSize: '0.875rem',
          fontWeight: '500'
        },
        popper: {
          inset: '8px auto auto 0px !important'
        }
      }
    }
  }
});

const StyledSearchBox = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'flex-end',
  backgroundColor: '#F8F9FA',
  color: '#000000',
  height: '36px',
  padding: '8px 16px !important',
  margin: '0px !important',
  borderRadius: theme.spacing(0.75)
}));

const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function SearchCustom(props) {
  const { setErrorState, map } = props;
  const dispatch = useDispatch();
  const selectedRegion = useSelector(selectedRegionSelector);
  const drawnFromState = useSelector(drawnLayersSelector);
  const regionConfig = mapConfig.regions[selectedRegion];
  const areasToSearch = mapConfig.statesList.concat(mapConfig.countiesList)
    .concat(mapConfig.huc8List);
  const [open, setOpen] = React.useState(false);

  const statesFeatureLayer = esri.featureLayer({
    url: 'https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/cb_2022_us_state_crest/FeatureServer/0'
  });

  const countiesFeatureLayer = esri.featureLayer({
    url: 'https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/cb_2022_us_county_500k_counties_crest/FeatureServer/0'
  });

  const huc8FeatureLayer = esri.featureLayer({
    url: 'https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/huc8_all_crest/FeatureServer/0'
  });

  const stateQuery = statesFeatureLayer.query();
  const countyQuery = countiesFeatureLayer.query();
  const huc8Query = huc8FeatureLayer.query();

  // Send query to arcgis and draw the state, county, or huc8 on the map
  const runQuery = (query, type) => {
    query.run((error, featureCollection, response) => {
      if (error) {
        return;
      }
      if (featureCollection.features.length === 0) {
        return;
      }
      const feature = featureCollection.features[0]; // should only be one feature
      feature.properties.areaName = feature.properties.NAME; // need this for correct plotting
      if (type === 'county') {
        feature.properties.NAME = `${feature.properties.NAMELSAD}, ${feature.properties.STUSPS}`;
        feature.properties.areaName = feature.properties.NAME; // need this for correct plotting
      }
      if (type === 'huc8') {
        feature.properties.NAME = feature.properties.huc8;
        feature.properties.areaName = feature.properties.NAME; // need this for correct plotting
      }
      const zonalStatsKeys = regionConfig.zonalStatsKeys;
      const geoToDraw = convertDataForZonalStats(feature, zonalStatsKeys);
      map.fitBounds(L.geoJSON(geoToDraw).getBounds());
      dispatch(addNewFeatureToDrawnLayers(geoToDraw));
    });
  };

  const onHandleSearchChange = (event, newInputValue) => {
    if (newInputValue === null) { return; }
    let queryRegionName = selectedRegion;
    if (selectedRegion === "Hawai'i") { queryRegionName = "Hawai''i"; } // gotta escape single quote
    // check if already drawn and if so - remove it
    const previousDrawn = drawnFromState?.features?.filter((item) => (
      item.properties.areaName === newInputValue &&
      item.properties.region === selectedRegion
    ));
    if (previousDrawn && previousDrawn.length > 0) {
      return;
    }
    if (regionConfig.statesList.includes(newInputValue)) {
      stateQuery.where(`NAME='${newInputValue}'
        AND region='${queryRegionName}'`);
      runQuery(stateQuery, 'state');
    } else if (regionConfig.countiesList.includes(newInputValue)) {
      const countySplit = newInputValue.split(','); // split county and state (e.g Washington County, NC)
      countyQuery.where(`NAMELSAD='${countySplit[0]}'
        AND region='${queryRegionName}'
        AND STUSPS='${countySplit[1].trim()}'`);
      runQuery(countyQuery, 'county');
    } else if (regionConfig.huc8List.includes(newInputValue)) {
      huc8Query.where(`huc8='${newInputValue}'`);
      runQuery(huc8Query, 'huc8');
    } else {
      setErrorState((previous) => ({
        ...previous,
        error: true,
        errorType: 'info',
        errorTitle: 'No Data Found',
        errorMessage: 'There was no data found in this region for the selected state, county, or watershed',
        // acceptButtonText: 'Proceed',
        acceptButtonClose: () => {
          setErrorState({ ...previous, error: false });
          event.stopPropagation();
        }
      }));
    }
  };

  const handleInputChange = (_, value) => {
    if (value.length < 3) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Box p={0.75}>
      <ThemeProvider theme={customAutoCompleteTheme}>
        <Autocomplete
          id='search-area-autocomplete'
          fullWidth
          autoComplete={true}
          autoHighlight={true}
          open={open}
          options={areasToSearch}
          onClose={() => setOpen(false)}
          clearOnBlur={false}
          onInputChange={handleInputChange}
          onChange={onHandleSearchChange}
          renderInput={(params) => (
          <StyledSearchBox >
            <SearchOutlined sx={{
              fontSize: '20px',
              color: '#000000',
              padding: '0px',
              marginRight: '8px'
            }}/>
              <TextField
                sx={{ margin: '0px', padding: '0px' }}
                fullWidth
                {...params}
                label="Search for a State, County, or Watershed"
                aria-label={'Search for a State, County, or Watershed'}
                id='search-area-textfield'
                variant="standard"
                type="search"/>
          </StyledSearchBox>
          )
          }
        />
      </ThemeProvider>
    </Box>
  );
}
SearchCustom.propTypes = {
  map: PropTypes.object,
  setErrorState: PropTypes.func
};
