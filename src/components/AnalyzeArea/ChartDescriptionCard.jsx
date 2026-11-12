import React from "react";

import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { CancelOutlined } from "@mui/icons-material";
import { Grid, Typography, IconButton } from "@mui/material";

const ChartDescriptionGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  fleWrap: "wrap",
  backgroundColor: theme.palette.CRESTGridBackground.dark,
}));

const chartBreaker = {
  height: "4px",
  padding: "0px 0px 16px 0px",
  margin: "0 5% 0 5%",
  borderStyle: "solid none none",
  borderWidth: "1px 0px 0px",
  borderColor: "#555555 transparent transparent",
  backgroundColor: "transparent",
};

export default function ChartDescriptionCard(props) {
  const { chartLabel, chartDescription, setChartDescription } = props;

  return (
    <ChartDescriptionGrid container spacing={0} px={6} pt={0} pb={2}>
      <Grid
        item
        xs={10}
        style={{
          backgroundColor: "#444444",
          padding: "8px 8px 0px 8px",
          border: "1px solid #444444",
          borderTopLeftRadius: "4px",
        }}
      >
        <Typography variant="h6" component="div">
          How &ldquo;{chartLabel}&rdquo; was calculated
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "end",
          alignContent: "start",
          backgroundColor: "#444444",
          padding: "4px",
          border: "1px solid #444444",
          borderTopRightRadius: "4px",
        }}
      >
        <IconButton onClick={() => setChartDescription(null)}>
          <CancelOutlined style={{ fontSize: "1.25rem" }} />
        </IconButton>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          backgroundColor: "#444444",
          padding: "8px",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      >
        <hr style={chartBreaker} />
        <Typography
          variant="body2"
          component="div"
          sx={{ fontSize: "0.75rem" }}
        >
          {chartDescription}
        </Typography>
      </Grid>
    </ChartDescriptionGrid>
  );
}

ChartDescriptionCard.propTypes = {
  chartLabel: PropTypes.string,
  chartDescription: PropTypes.string,
  setChartDescription: PropTypes.func,
};
