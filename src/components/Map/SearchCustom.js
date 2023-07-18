/*
Purpose
  Search for places from somewhere in AGOL rest api.
  this is for county or wathershed not sure how this
  will work but thinking to put it all in one feature
  layer and search by name get geojson or something
  like that
  we may want to pre run the zonal stats and store it
  like we have done Hubs in the past. just some thoughts to make it easier

Child Components
  - map.js

Libs
  - Not sure yer

API
  - SearchKnown

State needed
  - Not sure yet

Props
  Not sure yet
*/
import * as React from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { SearchOutlined } from '@mui/icons-material'; // for when we need it, Search } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

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

// just a place holder needs props passed in and image etc
export default function SearchCustom(props) {
  return (
    <Box p={0.75} >
      <StyledSearchBox >
        <SearchOutlined sx={{ color: '#000000', margin: (theme) => theme.spacing(1) }}/>
        <StyledTextField
          id="input-custom-search"
          fullWidth
          label="Search for a County or Watershed"
          aria-label={'Search for a County or Watershed'}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{}}
        />
      </StyledSearchBox>
    </Box>
  );
}
