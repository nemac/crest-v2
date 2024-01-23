import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/system';
import {
  CameraAlt,
  DeleteForever,
  MoreHorizOutlined,
  CenterFocusStrong
} from '@mui/icons-material';

import ActionButtonsHolder from '../All/ActionButtonsHolder';
import AnalyzeBarChart from './AnalyzeBarChart';
import {
  handleExportImage,
  handleMoreOnClick,
  handleZoomClick,
  removeLayer
} from './ChartFunctions';

// selector named functions for lint rules makes it easier to re-use if needed.
const analyzeAreaSelector = (state) => state.analyzeArea;

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '250px',
  maxHeight: '250px',
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    maxHeight: '300px'
  },
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '0px',
  borderBottom: '0px !important',
  justifyContent: 'center',
  alignItems: 'center'
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '250px',
  maxHeight: '250px',
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    maxHeight: '300px'
  },
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '0px',
  justifyContent: 'center',
  alignItems: 'center'
}));

export default function ChartCard(props) {
  const {
    region,
    map,
    feature,
    setHover,
    featureGroupRef
  } = props;

  const chartValues = {
    'Summary Chart': ['hubs', 'exposure', 'threat', 'asset', 'wildlife'],
    'Fish and Wildlife Inputs': ['aquatic', 'terrestrial', 'marine'],
    'Threats Inputs': [
      'floodprone_areas', 'slope', 'sea_level_rise', 'low_areas', 'drainage', 'impermeable',
      'storm_surge', 'erosion', 'tsunami', 'permafrost', 'wave_flooding', 'geostress'],
    'Community Assets Inputs': [
      'pop_density', 'crit_infra', 'transportation',
      'social_vuln', 'crit_facilities'],
    Landcover: []
  };

  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(analyzeAreaSelector);

  const chartActionButtons = [
    {
      buttonLabel: analyzeAreaState.isMore[feature.properties.areaName] ? 'Less' : 'More',
      buttonName: analyzeAreaState.isMore[feature.properties.areaName] ? 'Less' : 'More',
      onClick: () => { handleMoreOnClick(dispatch, feature.properties.areaName); },
      icon: <MoreHorizOutlined />
    },
    {
      buttonLabel: 'Export',
      buttonName: 'Export',
      // TODO: This probably needs to be a csv of just the area in question
      onClick: () => { handleExportImage('Summary Chart'); },
      icon: <CameraAlt />
    },
    {
      buttonLabel: 'Zoom',
      buttonName: 'Zoom',
      onClick: (e) => { handleZoomClick(e, feature, map, dispatch); },
      icon: <CenterFocusStrong />
    },
    {
      buttonLabel: 'Remove',
      buttonName: 'Remove',
      onClick: (e) => { removeLayer(e, feature, dispatch, featureGroupRef); },
      icon: <DeleteForever />
    }
  ];

  const handleMouseEnter = () => {
    if (feature.properties.buffGeo) {
      setHover({ bufferAreaName: feature.properties.areaName });
    } else {
      setHover({ areaName: feature.properties.areaName });
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  // setup for dealing with expanded more charts
  const transparentBorder = {  borderBottomWidth: '0px', borderBottomColor: 'transparent', borderBottomStyle: 'solid' };
  const solidBorder = {  borderBottomWidth: '1px', borderBottomColor: '#555555', borderBottomStyle: 'solid' };
  const dashedBorder = {  borderBottomWidth: '1px', borderBottomColor: '#555555', borderBottomStyle: 'dashed' };
  let cnt = 1;

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={4} >
      {analyzeAreaState.isMore[feature.properties.areaName] ? (
        <div style={{ width: '100%', borderWidth: '1px', borderColor: '#555555', borderStyle: 'solid' }}>
          {Object.entries(chartValues).map(([key, value]) => (
            <Grid xs={12} test={value} key={key} style={ (Object.entries(chartValues).length) === cnt++ ?  transparentBorder : dashedBorder }>
              <StyledBox >
                <ContentBox
                  onMouseEnter={ setHover ? handleMouseEnter : null}
                  onMouseLeave={ setHover ? handleMouseLeave : null}
                  components='fieldset'
                  id={`${key}-chartbox`}
                >
                  <AnalyzeBarChart
                    chartRegion={region}
                    chartIndices={value}
                    chartType={key}
                    areaName={feature.properties.areaName}
                    setHover={setHover}
                    feature={feature}
                    zonalStatsData={feature.properties.zonalStatsData}
                    barchartMargin={{
                      top: 90,
                      right: 30,
                      left: 0,
                      bottom: 30
                    }}
                  />
                </ContentBox>
              </StyledBox>
              <ActionButtonsHolder
                actionButtons={[
                  {
                    buttonLabel: 'Export',
                    buttonName: 'Export',
                    onClick: () => { handleExportImage(key); },
                    icon: <CameraAlt />
                  }
                ]}
                styledGridSx={
                  { height: (theme) => theme.spacing(8), maxHeight: (theme) => theme.spacing(8), borderWidth: '0px' }
                }
              />
            </Grid>
          ))}

          <Grid xs={12} >
            <ActionButtonsHolder
              actionButtons={chartActionButtons}
              styledGridSx={
                {  height: (theme) => theme.spacing(8), maxHeight: (theme) => theme.spacing(8), borderWidth: '0px', borderTopWidth: '1px' }
              }
            />
          </Grid>
        </div>

      ) : (

        <div style={{ width: '100%', borderWidth: '1px', borderColor: '#555555', borderStyle: 'solid' }}>
          <Grid xs={12}  >
            <ContentBox
              onMouseEnter={ setHover ? handleMouseEnter : null}
              onMouseLeave={ setHover ? handleMouseLeave : null}
              components='fieldset'
              id={'Summary Chart-chartbox'}
            >
              <AnalyzeBarChart
                chartRegion={region}
                chartIndices={chartValues['Summary Chart']}
                chartType={'Summary Chart'}
                areaName={feature.properties.areaName}
                setHover={setHover}
                feature={feature}
                zonalStatsData={feature.properties.zonalStatsData}
                barchartMargin={{
                  top: 90,
                  right: 30,
                  left: 0,
                  bottom: 30
                }}
              />
            </ContentBox>
          </Grid>

          <Grid xs={12} >
            <ActionButtonsHolder
              actionButtons={chartActionButtons}
              styledGridSx={
                { height: (theme) => theme.spacing(8), maxHeight: (theme) => theme.spacing(8), borderWidth: '0px', borderTopWidth: '1px'}
              }
            />
          </Grid>
        </div>
      )}

    </Grid>
  );
}

ChartCard.propTypes = {
  region: PropTypes.string,
  map: PropTypes.object,
  setHover: PropTypes.func,
  feature: PropTypes.object,
  featureGroupRef: PropTypes.object
};
