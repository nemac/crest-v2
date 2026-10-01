import React, { useRef, useState } from "react";
import ReactGA from "react-ga4";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/system";
import {
  CameraAlt,
  DeleteForever,
  MoreHorizOutlined,
  CenterFocusStrong,
} from "@mui/icons-material";
// this not good practice but nothing else works and
// its not that important
/* eslint-disable no-plusplus */
import ActionButtonsHolder from "../All/ActionButtonsHolder.jsx";
import AnalyzeBarChart from "./AnalyzeBarChart.jsx";
import ResiliencePieChart from "./ResiliencePieChart.jsx";
import ChartDescriptionCard from "./ChartDescriptionCard.jsx";
import {
  exportFeatureToCSV,
  handleExportImage,
  handleMoreOnClick,
  handleZoomClick,
  removeLayer,
} from "./ChartFunctions.jsx";
import { mapConfig } from "../../configuration/config";

// selector named functions for lint rules makes it easier to re-use if needed.
const analyzeAreaSelector = (state) => state.analyzeArea;
const regions = mapConfig.regions;

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  // height: "375px",
  maxHeight: "375px",
  [theme.breakpoints.down("sm")]: {
    // height: "425px",
    maxHeight: "425px",
  },
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: "solid",
  borderWidth: "0px",
  borderBottom: "0px !important",
  justifyContent: "center",
  alignItems: "center",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "275px",
  maxHeight: "275px",
  [theme.breakpoints.down("sm")]: {
    height: "300px",
    maxHeight: "300px",
  },
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: "solid",
  borderWidth: "0px",
  justifyContent: "center",
  alignItems: "center",
}));

const LandcoverChartTitle = (props) => {
  const { title } = props;
  return (
    <text
      x={400 / 2}
      y={"10%"}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <tspan style={{ fontSize: "1.25rem" }}>{title}</tspan>
    </text>
  );
};

LandcoverChartTitle.propTypes = {
  title: PropTypes.string,
};

export default function ChartCard(props) {
  const { region, map, feature, setHover, featureGroupRef } = props;
  const [chartDescription, setChartDescription] = useState(null);
  const [chartLabel, setChartLabel] = useState(null);
  const [chartTipLabel, setChartTipLabel] = useState(null);
  const [chartDescriptionFor, setChartDescriptionFor] = useState(null);
  const [anchorElSummaryMenu, setAnchorElSummaryMenu] = useState(null);
  const [anchorElMoreIndividual, setAnchorElMoreIndividual] = useState(null);
  const [anchorElMoreAll, setAnchorElMoreAll] = useState(null);
  const clickedExport = useRef(null); // this ref is used to determine where the isMore export click happened
  const isSummaryMenuOpen = Boolean(anchorElSummaryMenu);
  const isMoreIndividualOpen = Boolean(anchorElMoreIndividual);
  const isMoreAllOpen = Boolean(anchorElMoreAll);

  const chartValues = {
    "Summary Chart": ["hubs", "exposure", "threat", "asset", "wildlife"],
    "Fish and Wildlife Inputs": ["aquatic", "terrestrial", "marine"],
    "Threats Inputs": [
      "floodprone_areas",
      "slope",
      "sea_level_rise",
      "low_areas",
      "drainage",
      "impermeable",
      "storm_surge",
      "erosion",
      "tsunami",
      "permafrost",
      "wave_flooding",
      "geostress",
      "landslides",
      "highwater",
    ],
    "Community Assets Inputs": [
      "pop_density",
      "crit_infra",
      "transportation",
      // "social_vuln",
      "crit_facilities",
    ],
    Landcover: ["does not matter"],
  };

  let landcoverConfigToUse = null;
  const regionName = regions[region].regionName;
  if (
    regionName === "continental_us" ||
    regionName === "alaska" ||
    regionName === "great_lakes"
  ) {
    landcoverConfigToUse = mapConfig.nlcdLandcover;
  } else {
    landcoverConfigToUse = mapConfig.ccapLandcover;
  }

  const landcoverData = [];
  const pieChartLegendColors = [];

  for (let i = 0; i < landcoverConfigToUse.length; i += 1) {
    const value =
      feature.properties.zonalStatsData[landcoverConfigToUse[i].value];
    // no need to show low values also zero values cause errors with pie charts not sure why
    if (value > 1) {
      landcoverData.push({ name: landcoverConfigToUse[i].name, value });
      pieChartLegendColors.push(landcoverConfigToUse[i].color);
    }
  }

  const landcoverDataSort = landcoverData.sort((a, b) => a.value - b.value);

  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(analyzeAreaSelector);

  const handleClickExportSummary = (event) => {
    setAnchorElSummaryMenu(event.currentTarget);
  };

  const handleClickExportMoreIndividual = (event) => {
    setAnchorElMoreIndividual(event.currentTarget);
  };

  const handleClickExportMoreAll = (event) => {
    setAnchorElMoreAll(event.currentTarget);
  };

  const handleCloseExportSummary = () => {
    setAnchorElSummaryMenu(null);
  };

  const handleCloseExportMoreIndividual = () => {
    setAnchorElMoreIndividual(null);
  };

  const handleCloseExportMoreAll = () => {
    setAnchorElMoreAll(null);
  };

  const chartActionButtons = [
    {
      buttonLabel: analyzeAreaState.isMore[feature.properties.areaName]
        ? "Less"
        : "More",
      buttonName: analyzeAreaState.isMore[feature.properties.areaName]
        ? "Less"
        : "More",
      id: `btn-more-less-${feature.properties.areaName.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "-")}`,
      onClick: () => {
        handleMoreOnClick(dispatch, feature.properties.areaName);
        setChartDescription(null);
        setChartLabel(null);
        setChartTipLabel(null);
        setChartDescriptionFor(null);
      },
      icon: <MoreHorizOutlined />,
    },
    {
      buttonLabel: "Export",
      buttonName: "Export",
      id: `btn-export-${feature.properties.areaName}`,
      onClick: (e) => {
        // export all or just summary map depending on expanded details
        if (analyzeAreaState.isMore[feature.properties.areaName]) {
          handleClickExportMoreAll(e);
        } else {
          handleClickExportSummary(e);
        }
      },
      icon: <CameraAlt />,
    },
    {
      buttonLabel: "Zoom",
      buttonName: "Zoom",
      id: `btn-zoom-${feature.properties.areaName}`,
      onClick: (e) => {
        handleZoomClick(e, feature, map, dispatch);
      },
      icon: <CenterFocusStrong />,
    },
    {
      buttonLabel: "Remove",
      buttonName: "Remove",
      id: `btn-remove-${feature.properties.areaName}`,
      onClick: (e) => {
        removeLayer(e, feature, dispatch, featureGroupRef);
      },
      icon: <DeleteForever />,
    },
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
  const transparentBorder = { display: "none" };
  const chartBreaker = {
    height: "4px",
    padding: "0",
    margin: "0 5% 0 5%",
    borderStyle: "solid none none",
    borderWidth: "1px 0px 0px",
    borderColor: "#555555 transparent transparent",
    backgroundColor: "#0A0A0A",
  };
  let cnt = 1;

  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      px={0}
      pb={4}
    >
      {analyzeAreaState.isMore[feature.properties.areaName] ? (
        <div
          id={`box-${feature.properties.areaName.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "-")}`}
          style={{
            width: "100%",
            borderWidth: "1px",
            borderColor: "#555555",
            borderStyle: "solid",
            paddingRight: "0px",
          }}
        >
          {Object.entries(chartValues).map(([key, value]) => (
            <Grid
              xs={12}
              test={value}
              key={key}
              style={{ backgroundColor: "#0A0A0A" }}
            >
              <StyledBox>
                <ContentBox
                  onMouseEnter={setHover ? handleMouseEnter : null}
                  onMouseLeave={setHover ? handleMouseLeave : null}
                  components="fieldset"
                  id={`${key}-chartbox`}
                >
                  {key !== "Landcover" ? (
                    <AnalyzeBarChart
                      chartRegion={region}
                      chartTipLabel={chartTipLabel}
                      chartIndices={value}
                      chartType={key}
                      areaName={feature.properties.areaName.toString()}
                      setHover={setHover}
                      feature={feature}
                      setChartDescription={setChartDescription}
                      setChartLabel={setChartLabel}
                      setChartTipLabel={setChartTipLabel}
                      setChartDescriptionFor={setChartDescriptionFor}
                      zonalStatsData={feature.properties.zonalStatsData}
                      barchartMargin={{
                        top: 60,
                        right: 30,
                        left: 0,
                        bottom: 85,
                      }}
                    />
                  ) : (
                    <ResiliencePieChart
                      data={landcoverDataSort}
                      legendColors={pieChartLegendColors}
                      chartTitle={feature.properties.areaName.toString()}
                      chartType={"Landcover"}
                      showLegend={false}
                    />
                  )}
                </ContentBox>
              </StyledBox>
              {chartDescription && chartDescriptionFor === key ? (
                <ChartDescriptionCard
                  chartLabel={chartLabel}
                  chartTipLabel={chartTipLabel}
                  chartDescription={chartDescription}
                  setChartDescription={setChartDescription}
                  setChartLabel={setChartLabel}
                  setChartTipLabel={setChartTipLabel}
                  setChartDescriptionFor={setChartDescriptionFor}
                />
              ) : (
                <></>
              )}
              <ActionButtonsHolder
                actionButtons={[
                  {
                    buttonLabel: "Export",
                    buttonName: "Export",
                    onClick: (e) => {
                      handleClickExportMoreIndividual(e);
                      clickedExport.current = `${key}`;
                    },
                    icon: <CameraAlt />,
                  },
                ]}
                styledGridSx={{
                  height: (theme) => theme.spacing(8),
                  maxHeight: (theme) => theme.spacing(8),
                  borderWidth: "0px",
                }}
              />
              <hr
                style={
                  Object.entries(chartValues).length === cnt++
                    ? transparentBorder
                    : chartBreaker
                }
              />
            </Grid>
          ))}
          <Grid xs={12}>
            <ActionButtonsHolder
              actionButtons={chartActionButtons}
              styledGridSx={{
                height: (theme) => theme.spacing(8),
                maxHeight: (theme) => theme.spacing(8),
                borderWidth: "0px",
                borderTopWidth: "1px",
              }}
            />
          </Grid>
        </div>
      ) : (
        <div
          id={`box-${feature.properties.areaName.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "-")}`}
          style={{
            width: "100%",
            borderWidth: "1px",
            borderColor: "#555555",
            borderStyle: "solid",
            paddingRight: "0px",
          }}
        >
          <Grid xs={12}>
            <ContentBox
              onMouseEnter={setHover ? handleMouseEnter : null}
              onMouseLeave={setHover ? handleMouseLeave : null}
              components="fieldset"
              id={"Summary Chart-chartbox"}
            >
              <AnalyzeBarChart
                chartRegion={region}
                chartTipLabel={chartTipLabel}
                chartIndices={chartValues["Summary Chart"]}
                chartType={"Summary Chart"}
                areaName={feature.properties.areaName.toString()}
                setHover={setHover}
                feature={feature}
                zonalStatsData={feature.properties.zonalStatsData}
                setChartDescription={setChartDescription}
                setChartLabel={setChartLabel}
                setChartTipLabel={setChartTipLabel}
                setChartDescriptionFor={setChartDescriptionFor}
                barchartMargin={{
                  top: 60,
                  right: 30,
                  left: 0,
                  bottom: 85,
                }}
              />
            </ContentBox>
          </Grid>
          {chartDescription ? (
            <Grid xs={12} p={0}>
              <ChartDescriptionCard
                chartLabel={chartLabel}
                chartTipLabel={chartTipLabel}
                chartDescription={chartDescription}
                setChartDescription={setChartDescription}
                setChartLabel={setChartLabel}
                setChartTipLabel={setChartTipLabel}
                setChartDescriptionFor={setChartDescriptionFor}
              />
            </Grid>
          ) : (
            <></>
          )}
          <Grid xs={12}>
            <ActionButtonsHolder
              actionButtons={chartActionButtons}
              styledGridSx={{
                height: (theme) => theme.spacing(8),
                maxHeight: (theme) => theme.spacing(8),
                borderWidth: "0px",
                borderTopWidth: "1px",
              }}
            />
          </Grid>
        </div>
      )}
      {/* This is the dropdown export menu for when "More" is NOT pressed and you want to export summary */}
      <Menu
        id="export-menu"
        anchorEl={anchorElSummaryMenu}
        open={isSummaryMenuOpen}
        onClose={handleCloseExportSummary}
        MenuListProps={{
          "aria-labelledby": "export-button",
        }}
      >
        <MenuItem
          onClick={() => {
            // Less Summary Export Image
            handleCloseExportSummary();
            handleExportImage(`Summary Chart-${feature.properties.areaName}`);
            ReactGA.event({
              category: "engagement",
              action: "export_chart",
              label: "summary image",
            });
          }}
        >
          Export Image
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseExportSummary();
            exportFeatureToCSV(feature, "Summary Chart");
            ReactGA.event({
              category: "engagement",
              action: "export_chart",
              label: "summary csv",
            });
          }}
        >
          Export CSV
        </MenuItem>
      </Menu>
      {/* This is the dropdown export menu for when "Less" is pressed and you want to export individual chart/csv */}
      <Menu
        id="export-menu"
        anchorEl={anchorElMoreIndividual}
        open={isMoreIndividualOpen}
        onClose={handleCloseExportMoreIndividual}
        MenuListProps={{
          "aria-labelledby": "export-button",
        }}
      >
        <MenuItem
          onClick={() => {
            // isMore export image individual
            handleCloseExportMoreIndividual();
            handleExportImage(
              `${clickedExport.current}-${feature.properties.areaName}`,
            );
            ReactGA.event({
              category: "engagement",
              action: "export_chart",
              label: `image ${clickedExport.current}`,
            });
          }}
        >
          Export Image
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseExportMoreIndividual();
            exportFeatureToCSV(feature, clickedExport.current);
            ReactGA.event({
              category: "engagement",
              action: "export_chart",
              label: `csv ${clickedExport.current}`,
            });
          }}
        >
          Export CSV
        </MenuItem>
      </Menu>
      {/* This is the dropdown export menu for when "Less" is pressed and you want to export all charts/csv */}
      <Menu
        id="export-menu"
        anchorEl={anchorElMoreAll}
        open={isMoreAllOpen}
        onClose={handleCloseExportMoreAll}
        MenuListProps={{
          "aria-labelledby": "export-button",
        }}
      >
        <MenuItem
          onClick={() => {
            // isMore export image all
            handleCloseExportMoreAll();
            Object.entries(chartValues).map(([key, value]) =>
              handleExportImage(`${key}-${feature.properties.areaName}`),
            );
            ReactGA.event({
              category: "engagement",
              action: "export_chart",
              label: "image all",
            });
          }}
        >
          Export Image
        </MenuItem>
        <MenuItem
          // isMore export csv all
          onClick={() => {
            handleCloseExportMoreAll();
            exportFeatureToCSV(feature, "All");
            ReactGA.event({
              category: "engagement",
              action: "export_chart",
              label: "csv all",
            });
          }}
        >
          Export CSV
        </MenuItem>
      </Menu>
    </Grid>
  );
}

ChartCard.propTypes = {
  region: PropTypes.string,
  map: PropTypes.object,
  setHover: PropTypes.func,
  feature: PropTypes.object,
  featureGroupRef: PropTypes.object,
};
