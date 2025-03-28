/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { SortOutlined } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import ActionButton from "../All/ActionButton.jsx";
// import './style.css';
import {
  changeSortDirection,
  changeSortBy,
} from "../../reducers/analyzeAreaSlice";

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  height: theme.spacing(14),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: "solid",
  borderWidth: "1px",
}));

const analyzeAreaSelector = (state) => state.analyzeArea;

export const ChartSort = () => {
  const sortIndices = {
    Name: "areaNumber",
    Hubs: "hubs",
    Exposure: "exposure",
    Threat: "threat",
    Assets: "asset",
    Wildlife: "wildlife",
  };
  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(analyzeAreaSelector);

  const handleSortClick = (chartName) => {
    if (chartName !== analyzeAreaState.sortBy) {
      dispatch(changeSortBy(chartName));
    } else {
      dispatch(changeSortDirection(chartName));
    }
  };
  // const handleAscendingClick = () => {
  //   // This is to be combined with handleSortClick... if chartName is already sortBy, do this
  //   dispatch(changeSortDirection());
  // };

  return (
    <StyledGridContainer container spacing={0} p={0} mt={-1} mb={1}>
      <Grid xs={12}>
        <Typography
          variant="body1"
          component="div"
          justifyContent="center"
          alignItems="center"
          p={1}
          sx={{ display: "flex" }}
        >
          Sort by:
        </Typography>
      </Grid>
      {Object.entries(sortIndices).map(([chart, chartName], index) => (
        <Grid
          xs={2}
          key={`grid-${chart}`}
          sx={{
            backgroundColor:
              chartName === analyzeAreaState.sortBy ? "grey" : null,
          }}
        >
          <ActionButton
            key={`sort-button-${index}`}
            buttonLabel={chart}
            buttonName={chart}
            onClick={() => handleSortClick(chartName)}
          >
            {analyzeAreaState.isSortASC[chartName] ? (
              <SortOutlined />
            ) : (
              <SortOutlined sx={{ transform: "rotate(-180deg)" }} />
            )}
          </ActionButton>
        </Grid>
      ))}
    </StyledGridContainer>
  );
};

ChartSort.propTypes = {};
