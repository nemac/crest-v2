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
import ResiliencePieChart from './ResiliencePieChart';
import {
  handleExportImage,
  handleMoreOnClick,
  handleZoomClick,
  removeLayer
} from './ChartFunctions';
import { mapConfig } from '../../configuration/config';

// selector named functions for lint rules makes it easier to re-use if needed.
const analyzeAreaSelector = (state) => state.analyzeArea;

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '340px',
  maxHeight: '340px',
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    maxHeight: '300px'
  },
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderBottom: '0px !important',
  justifyContent: 'center',
  alignItems: 'center'
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '340px',
  maxHeight: '340px',
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    maxHeight: '300px'
  },
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px',
  justifyContent: 'center',
  alignItems: 'center'
}));

const LandcoverChartTitle = (props) => {
  const { title } = props;
  return (
    <text
      x={400 / 2}
      y={'10%'}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      <tspan style={{ fontSize: '1.25rem' }}>{title}</tspan>
    </text>
  );
};

LandcoverChartTitle.propTypes = {
  title: PropTypes.string
};

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
    Landcover: ['landcover_empty', 'landcover_open_water', 'landcover_perenial_ice/snow',
      'landcover_developed_open_space', 'landcover_developed_low_intensity',
      'landcover_developed_medium_intensity', 'landcover_developed_high_intensity',
      'landcover_barren_land', 'landcover_deciduous_forest', 'landcover_evergreen_forest',
      'landcover_mixed_forest', 'landcover_dwarf_scrub', 'landcover_shrub/scrub',
      'landcover_grassland/herbaceous', 'landcover_sedge/herbaceous', 'landcover_lichens',
      'landcover_moss', 'landcover_pasture/hay-areas', 'landcover_cultivated_crops',
      'landcover_woody_wetlands', 'landcover_emergent_herbaceous_wetlands']
  };

  let landcoverConfigToUse = null;
  if (region === 'continental_us' || region === 'alaska') {
    landcoverConfigToUse = mapConfig.nlcdLandcover;
  } else {
    landcoverConfigToUse = mapConfig.ccapLandcover;
  }

  const landcoverData = [];
  const pieChartLegendColors = [];

  for (let i = 0; i < landcoverConfigToUse.length; i += 1) {
    const value = feature.properties.zonalStatsData[landcoverConfigToUse[i].value];
    landcoverData.push({ name: landcoverConfigToUse[i].name, value });
    pieChartLegendColors.push(landcoverConfigToUse[i].color);
  }

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

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={2} >
      {analyzeAreaState.isMore[feature.properties.areaName] ? (
        <div style={{ width: '100%' }}>
          {Object.entries(chartValues).map(([key, value]) => (
            <Grid xs={12} key={key}>
              <StyledBox >
                <ContentBox
                  onMouseEnter={ setHover ? handleMouseEnter : null}
                  onMouseLeave={ setHover ? handleMouseLeave : null}
                  components='fieldset'
                  id={`${key}-chartbox`}
                >
                  {key !== 'Landcover' ? (
                    <AnalyzeBarChart
                      chartRegion={region}
                      chartIndices={value}
                      chartType={key}
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
                  ) : (
                    <ResiliencePieChart
                      data={landcoverData}
                      legendColors={pieChartLegendColors}
                      chartTitle={key.concat(' ').concat(feature.properties.areaName)}
                      chartType={key}
                    />
                  )}
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
                  { height: (theme) => theme.spacing(8), maxHeight: (theme) => theme.spacing(8) }
                }
              />
            </Grid>
          ))}

          <Grid xs={12} >
            <ActionButtonsHolder
              actionButtons={chartActionButtons}
              styledGridSx={
                { height: (theme) => theme.spacing(8), maxHeight: (theme) => theme.spacing(8) }
              }
            />
          </Grid>
        </div>

      ) : (

        <div style={{ width: '100%' }}>
          <Grid xs={12} >
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
                { height: (theme) => theme.spacing(8), maxHeight: (theme) => theme.spacing(8) }
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
