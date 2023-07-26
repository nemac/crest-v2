import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/system';

import ChartSummary from './ChartSummary';
import ChartActionButtons from './ChartActionButtons';
import ChartDetailsActionButtons from './ChartDetailsActionButtons';

// selector named functions for lint rules makes it easier to re-use if needed.
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const selectedRegionSelector = (state) => state.selectedRegion.value;

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

export default function ChartCard(props) {
  const {
    areaName,
    areaIndex,
    zonalStatsData,
    region,
    map,
    feature,
    layerToRemove,
    setHover,
    featureGroupRef
  } = props;
  const summaryIndices = ['hubs', 'exposure', 'asset', 'threat', 'wildlife'];
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

  const handleDownload = React.useCallback(async (chartType) => {
    const elId = `${chartType}-container`;
    await html2canvas(document.getElementById(elId), {
      logging: false,
      backgroundColor: null,
      useCORS: true, // Enable CORS to avoid cross-origin issues
      allowTaint: true, // Allow images from other domains
      useUnsafeCSS: true // Allow unsafe CSS (if needed)
    }).then((canvas) => {
      const png = canvas.toDataURL('image/png', 1.0);
      const fileName = `${chartType}.png`;
      FileSaver.saveAs(png, fileName);
    });
  }, []);

  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);

  if (region === selectedRegion) {
    return (
      <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={2} >
        {analyzeAreaState.isMore[areaName] ? (
          <div style={{ width: '100%' }}>
            {Object.entries(chartValues).map(([key, value]) => (
              <Grid xs={12} key={key}>
                <StyledBox >
                  <ChartSummary
                    chartRegion={region}
                    chartIndices={value}
                    chartType={key}
                    setHover={setHover}
                    feature={feature}
                  />
                </StyledBox>
                <ChartDetailsActionButtons
                  chartType={key}
                  handleDownload={handleDownload}
                />
              </Grid>
            ))}

            <Grid xs={12} >
              <ChartActionButtons
                areaName={areaName}
                areaIndex={areaIndex}
                data={zonalStatsData}
                map={map}
                layerToRemove={layerToRemove}
              />
            </Grid>
          </div>

        ) : (

          <div style={{ width: '100%' }}>
            <Grid xs={12} >
              <ChartSummary
                chartRegion={region}
                chartIndices={summaryIndices}
                chartType={'Summary Chart'}
                setHover={setHover}
                feature={feature}
              />
            </Grid>

            <Grid xs={12} >
              <ChartActionButtons
                areaName={areaName}
                areaIndex={areaIndex}
                data={zonalStatsData} // need to pick out the Summary
                map={map}
                layerToRemove={layerToRemove}
                featureGroupRef={featureGroupRef}
              />
            </Grid>
          </div>
        )}

      </Grid>
    );
  }
}

ChartCard.propTypes = {
  areaName: PropTypes.string.isRequired,
  areaIndex: PropTypes.number.isRequired,
  zonalStatsData: PropTypes.object,
  region: PropTypes.string,
  map: PropTypes.object,
  layerToRemove: PropTypes.object,
  setHover: PropTypes.func,
  feature: PropTypes.object,
  featureGroupRef: PropTypes.object
};
