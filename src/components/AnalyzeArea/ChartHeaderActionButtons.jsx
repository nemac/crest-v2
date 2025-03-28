/*
Purpose
  The component holds all of the chart and action buttons. This should be the summary chart only.

  There are four buttons which include
    - Sort (sorts data from high to low or low to high. sort will display a menu to choose
      sort order and sort field)
    - Export All (exports all the maps to png/svg (if in graph mode) or the data to
      CSV (if in table mode). will display a menu for the user to pick which format)
    - Graph/table (toggles graph or table mode)
    - Remove All (Removes all areas from map and anaylsis results area)

    We need to decide if the button action happens here?

Child Components
  - AnalyzeArea-ChartHeaderActionButtons.js
  - AnalyzeArea-Chart.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?
  - Graph or table mode
  - Sort field
  - Sort direction
  - Not sure yet

Props
  - Not sure yet
*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { styled } from "@mui/system";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  CameraAlt,
  DeleteForever,
  SortOutlined,
  // ToggleOff, keeping incase we go back to this
  // ToggleOn, keeping incase we go back to this
  TableChart,
  BarChart,
} from "@mui/icons-material";

import ChartHeaderActionButton from "./ChartHeaderActionButton.jsx";

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  height: theme.spacing(14),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: "solid",
  borderWidth: "1px",
}));

// selector named functions for lint rules makes it easier to re-use if needed.
const analyzeAreaSelector = (state) => state.analyzeArea;

export default function ChartHeaderActionButtons(props) {
  const {
    handleSortClick,
    handleGraphOrTableClick,
    HandleRemoveAllClick,
    handleExportImage,
    handleExportAllCSV,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // get the redux state for analyze area
  const analyzeAreaState = useSelector(analyzeAreaSelector);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledGridContainer
      container
      spacing={0}
      p={0}
      mt={{
        xs: 0,
        sm: 0,
        md: 1,
      }}
      mb={{
        xs: 0,
        sm: 0,
        md: 1,
      }}
    >
      <Grid xs={12}>
        <Typography
          variant="body1"
          component="div"
          justifyContent="center"
          alignItems="center"
          p={1}
          sx={{ display: "flex" }}
        >
          Analyzed project sites
        </Typography>
        {/* <Divider sx={{ marginLeft: '6px', marginRight: '6px' }} /> */}
      </Grid>
      <Grid xs={3}>
        <ChartHeaderActionButton
          // buttonLabel={`Sort by${sortIndices[analyzeAreaState.sortBy]}`}
          buttonLabel={`Sort`}
          buttonName={`Sort-(${analyzeAreaState.sortBy})`}
          onClick={handleSortClick}
        >
          {analyzeAreaState.isSortASC[analyzeAreaState.sortBy] ? (
            <SortOutlined />
          ) : (
            <SortOutlined sx={{ transform: "rotate(-180deg)" }} />
          )}
        </ChartHeaderActionButton>
      </Grid>
      <Grid xs={3}>
        <ChartHeaderActionButton
          buttonLabel={"Export"}
          buttonName={"Export"}
          onClick={(e) => {
            if (analyzeAreaState.isItAGraph) {
              handleClick(e);
            } else {
              handleExportAllCSV(e);
            }
          }}
          id="export-button"
          aria-controls={open ? "export-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <CameraAlt />
        </ChartHeaderActionButton>
        <Menu
          id="export-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "export-button",
          }}
        >
          <MenuItem
            onClick={(e) => {
              handleClose();
              handleExportImage(e);
            }}
          >
            Export Image
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              handleExportAllCSV(e);
            }}
          >
            Export CSV
          </MenuItem>
        </Menu>
      </Grid>
      <Grid xs={3}>
        <ChartHeaderActionButton
          buttonLabel={analyzeAreaState.isItAGraph ? "Table" : "Chart"}
          buttonName={analyzeAreaState.isItAGraph ? "Table" : "Chart"}
          onClick={handleGraphOrTableClick}
        >
          {analyzeAreaState.isItAGraph ? <TableChart /> : <BarChart />}
        </ChartHeaderActionButton>
      </Grid>
      <Grid xs={3}>
        <ChartHeaderActionButton
          buttonLabel={"Remove All"}
          buttonName={"Remove All"}
          onClick={HandleRemoveAllClick}
        >
          <DeleteForever />
        </ChartHeaderActionButton>
      </Grid>
    </StyledGridContainer>
  );
}

ChartHeaderActionButtons.propTypes = {
  handleSortClick: PropTypes.func.isRequired,
  handleGraphOrTableClick: PropTypes.func.isRequired,
  HandleRemoveAllClick: PropTypes.func.isRequired,
  handleExportImage: PropTypes.func.isRequired,
  handleExportAllCSV: PropTypes.func.isRequired,
};
