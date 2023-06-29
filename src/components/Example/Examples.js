/*
Purpose
  Any time the user arives at analze project sites or where should I do..
  there will be empty state meaning they will need to do an action to see a chart.
  They will need to either draw an area, upload an area, or choose/search for watershed or county

  Child Components
  -  None

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?

Props
  - Not sure yet
*/
import React from 'react';

import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import ExampleCard from './ExampleCard';
import { mapConfig } from '../../configuration/config';

const useStyles = makeStyles((theme) => ({
  CardBackground: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    color: theme.palette.CRESTGridBackground.contrastText,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '100%'
  },
  tempButtonBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.CRESTBlack.dark
  },
  EmptyStateBodyText: {
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '0.9rem'
    }
  }
}));

// just a place holder needs props passed in and image etc
export default function Example(props) {
  const { map, examplePolyData, setExamplePolyData } = props;
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  const handleExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box variant="outlined" square={false} className={classes.CardBackground} >
      {mapConfig.examples.map((example) => {
        const title = example.title;
        const summaryText = example.summaryText;
        const geojson = example.geojson;
        const mapCoordinates = example.mapCoordinates;
        const examplePolygonLabel = example.polygonLabel;
        const examplePolygonCoords = example.polygonCoords;
        const examplePolygonCenter = example.polygonCenter;
        const zoom = example.zoom;
        const steps = example.steps;
        return (
          <ExampleCard
            key={title}
            map={map}
            examplePolyData={examplePolyData}
            setExamplePolyData={setExamplePolyData}
            expanded={expanded}
            setExpanded={setExpanded}
            handleExpanded={handleExpanded}
            title={title}
            summaryText={summaryText}
            geojson={geojson}
            steps={steps}
            mapCoordinates={mapCoordinates}
            examplePolygonLabel={examplePolygonLabel}
            examplePolygonCoords={examplePolygonCoords}
            examplePolygonCenter={examplePolygonCenter}
            zoom={zoom}
          />
        );
      })}
    </Box>
  );
}
