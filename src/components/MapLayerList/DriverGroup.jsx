import React from "react";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownCircle from "@mui/icons-material/ArrowDropDownCircle";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import Layer from "./Layer.jsx";
import { toggleCollapsed } from "../../reducers/mapLayerListSlice";

export default function DriverGroup(props) {
  const { chartInputLabel, chartLayerList } = props;
  const dispatch = useDispatch();
  const expandedChartsSelector = (state) => state.mapLayerList.expandedCharts;
  const expandedCharts = useSelector(expandedChartsSelector);
  const isExpanded = expandedCharts.includes(chartInputLabel);

  const chartLayerListSorted = chartLayerList.sort((a, b) => {
    if (a.chartOrder) {
      return a.chartOrder - b.chartOrder;
    }
    return 0;
  });

  const onClick = () => {
    dispatch(toggleCollapsed(chartInputLabel));
  };

  return (
    <Accordion
      sx={{
        "&": (theme) => ({
          backgroundColor: theme.palette.CRESTDarkAlt.main,
          color: "theme.palette.CRESTDarkAlt.contrastText",
          marginTop: theme.spacing(1),
          borderRadius: theme.spacing(0.5),
        }),
      }}
      expanded={isExpanded}
      onChange={onClick}
      disableGutters={true}
    >
      <AccordionSummary
        sx={{
          "&": (theme) => ({
            height: "36px",
            minHeight: "46px",
            '& [class$="MuiAccordionSummary-content"]': {
              margin: theme.spacing(0.5),
            },
            "&:hover": {
              backgroundColor: "#6f6f6f",
              borderRadius: theme.spacing(0.5),
            },
          }),
        }}
        expandIcon={<ArrowDropDownCircle />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          sx={{
            fontWeight: "500",
            fontSize: "1rem",
            letterSpacing: "0.02857em",
          }}
        >
          {chartInputLabel}
        </Box>
      </AccordionSummary>
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        <Grid xs={12}>
          <Divider variant="middle" sx={{ borderColor: "#FFFFFF" }} />
        </Grid>
      </Grid>
      <AccordionDetails sx={{ padding: (theme) => theme.spacing(0) }}>
        <Box p={0.5}>
          {chartLayerListSorted.map((layer) => (
            <Layer key={layer.id} layerData={layer} />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

DriverGroup.propTypes = {
  chartInputLabel: PropTypes.string.isRequired,
  chartLayerList: PropTypes.array.isRequired,
};
