import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as esri from 'esri-leaflet';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { SearchOutlined } from '@mui/icons-material'; // for when we need it, Search } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { addNewFeatureToDrawnLayers } from '../../reducers/mapPropertiesSlice';
import { mapConfig } from '../../configuration/config';
import { convertDataForZonalStats } from '../../utility/utilityFunctions';

const StyledSearchBox = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'flex-end',
  backgroundColor: '#F8F9FA',
  color: '#000000',
  height: '48px',
  borderRadius: theme.spacing(0.75),
  '&:hover': {
    backgroundColor: '#c5c6c7'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  cursor: 'pointer',
  color: '#000000',
  fontSize: '0.875rem',
  fontWeight: '500',
  // input
  '& input': {
    cursor: 'pointer',
    color: '#000000',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.65),
    paddingBottom: theme.spacing(0.25)
  },
  // input label
  '& label': {
    cursor: 'pointer',
    color: '#000000',
    fontSize: '0.875rem',
    fontWeight: '500',
    borderBottomColor: '#657A8E',
    marginTop: theme.spacing(-0.5),
    zIndex: '100'
  },
  // input label
  '& label.MuiInputLabel-shrink': {
    fontSize: '1rem',
    fontWeight: '400',
    color: '#657A8E',
    marginTop: theme.spacing(0.5)
  },
  // input label with focus/typing search
  '& label.Mui-focused': {
    color: '#000000',
    fontSize: '1rem',
    fontWeight: '400',
    marginTop: theme.spacing(0.5)
  },
  // input with focus/typing search
  '& .Mui-focused input': {
    cursor: 'text',
    borderBottomColor: '#657A8E',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    marginBottom: '3px'
  }
}));

const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function SearchCustom(props) {
  const { setErrorState } = props;
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
      dispatch(addNewFeatureToDrawnLayers(geoToDraw));
    });
  };

  return (
    <Box p={0.75}>
      <StyledSearchBox>
        <SearchOutlined sx={{ color: '#000000', margin: (theme) => theme.spacing(1) }}/>
        <Autocomplete
          fullWidth
          // freeSolo
          autoComplete={true}
          autoHighlight={true}
          open={open}
          options={areasToSearch}
          onClose={() => setOpen(false)}
          // blurOnSelect={true}
          clearOnBlur={true}
          onInputChange={(_, value) => {
            if (value.length < 3) {
              setOpen(false);
            } else {
              setOpen(true);
            }
          }}
          onChange={(event, newInputValue) => {
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
            // const feature = data[newInputValue];
            // const zonalStatsKeys = regionConfig.zonalStatsKeys;
            // const geoToDraw = convertDataForZonalStats(feature, zonalStatsKeys);
            // console.log(geoToDraw);
            // dispatch(addNewFeatureToDrawnLayers(geoToDraw));
            // if (newInputValue !== null) {
            //   setSelectedName(newInputValue);
            // }
          }}
          sx={{ width: 500 }}
          renderInput={(params) => <StyledTextField
            id="input-custom-search"
            fullWidth
            {...params}
            label="Search for a State, County, or Watershed"
            aria-label={'Search for a State, County, or Watershed'}
            variant="standard"
            type="search"
            />
          }
        />
      </StyledSearchBox>
    </Box>
  );

  // return (
  //   <Box p={0.75} >
  //     <StyledSearchBox >
  //       <SearchOutlined sx={{ color: '#000000', margin: (theme) => theme.spacing(1) }}/>
  //       {/* <StyledTextField
  //         id="input-custom-search"
  //         fullWidth
  //         label="Search for a State, County, or Watershed"
  //         aria-label={'Search for a State, County, or Watershed'}
  //         variant="standard"
  //         InputProps={{ disableUnderline: true }}
  //         type='search'
  //         InputLabelProps={{}}
  //         onInput={(e) => {
  //           setSearchQuery(e.target.value);
  //         }}
  //       /> */}
  //       <Autocomplete
  //         disablePortal
  //         id="combo-box-demo"
  //         fullWidth
  //         freeSolo
  //         open={open}
  //         value={selectedName}
  //         onInputChange={(_, value) => {
  //           if (value.length < 2) {
  //             setOpen(false);
  //           } else {
  //             setOpen(true);
  //           }
  //         }}
  //         onClose={() => setOpen(false)}
  //         blurOnSelect={true}
  //         clearOnBlur={true}
  //         options={searchAreas}
  //         // getOptionLabel={(option) => option.properties.areaName}
  //         onChange={(event, newInputValue) => {
  //           console.log('jeff event', event);
  //           if (newInputValue !== null) {
  //             setSelectedName(newInputValue);
  //             setSkip(false);
  //           }
  //         }}
  //         // sx={{ width: 300 }}
  //         renderInput={(params) => <StyledTextField
  //           id="input-custom-search"
  //           fullWidth
  //           {...params}
  //           label="Search for a State, County, or Watershed"
  //           aria-label={'Search for a State, County, or Watershed'}
  //           variant="standard"
  //           type="search"
  //           // InputProps={{ disableUnderline: true }}
  //           />
  //         }
  //       />
  //     </StyledSearchBox>
  //   </Box>
  // );
}
SearchCustom.propTypes = {
  setErrorState: PropTypes.func
};
