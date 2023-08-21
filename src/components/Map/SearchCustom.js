import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { SearchOutlined } from '@mui/icons-material'; // for when we need it, Search } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { addNewFeatureToDrawnLayers } from '../../reducers/mapPropertiesSlice';
import { mapConfig } from '../../configuration/config';
import { useGetReadGeoQuery } from '../../services/readGeojson';

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

const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function SearchCustom(props) {
  const dispatch = useDispatch();
  const selectedRegion = useSelector(selectedRegionSelector);
  const [open, setOpen] = React.useState(false);
  const [skip, setSkip] = React.useState(true);
  const [selectedName, setSelectedName] = React.useState('');
  const searchAreas = mapConfig.regions[selectedRegion].searchAreas;

  const { data, error, isFetching } = useGetReadGeoQuery({
    region: selectedRegion,
    name: selectedName,
    fileToRead: mapConfig.regions[selectedRegion].readGeoFile
  }, { skip });

  React.useEffect(() => {
    if (data) {
      dispatch(addNewFeatureToDrawnLayers(data));
      setSelectedName('');
      setSkip(true);
    }
  }, [data, dispatch]);

  if (isFetching) {
    // eslint-disable-next-line no-console
    console.log('isFetching', isFetching);
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
  }

  return (
    <Box p={0.75} >
      <StyledSearchBox >
        <SearchOutlined sx={{ color: '#000000', margin: (theme) => theme.spacing(1) }}/>
        {/* <StyledTextField
          id="input-custom-search"
          fullWidth
          label="Search for a State, County, or Watershed"
          aria-label={'Search for a State, County, or Watershed'}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          type='search'
          InputLabelProps={{}}
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
        /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          fullWidth
          freeSolo
          open={open}
          value={selectedName}
          onInputChange={(_, value) => {
            if (value.length < 2) {
              setOpen(false);
            } else {
              setOpen(true);
            }
          }}
          onClose={() => setOpen(false)}
          blurOnSelect={true}
          clearOnBlur={true}
          options={searchAreas}
          // getOptionLabel={(option) => option.properties.areaName}
          onChange={(event, newInputValue) => {
            if (newInputValue !== null) {
              setSelectedName(newInputValue);
              setSkip(false);
            }
          }}
          // sx={{ width: 300 }}
          renderInput={(params) => <StyledTextField
            id="input-custom-search"
            fullWidth
            {...params}
            label="Search for a State, County, or Watershed"
            aria-label={'Search for a State, County, or Watershed'}
            variant="standard"
            type="search"
            // InputProps={{ disableUnderline: true }}
            />
          }
        />
      </StyledSearchBox>
    </Box>
  );
}
