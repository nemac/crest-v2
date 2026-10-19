import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch } from "react-redux";
import { changeActiveTab } from "../../reducers/NavBarSlice";
import TabCallToActionCard from "./TabCallToActionCard.jsx";

export default function TabCallToActions() {
  const dispatch = useDispatch();

  const handleActionClick = (actionLocation) => {
    dispatch(changeActiveTab(actionLocation));
    return null;
  };

  return (
    <Grid
      container
      flexDirection="row"
      spacing={3}
      justifyContent="center"
      alignContent="stretch"
      px={0.25}
      py={0.75}
    >
      <Grid xs={12} sm={12} md={6} lg={6}>
        <TabCallToActionCard
          tabLabel={"Analyze Project Sites"}
          tabLocation={"AnalyzeProjectSites"}
          tabText={
            "Examine and compare your project site(s) by proximity to \
            Resilience Hubs while exploring the Community Exposure and \
            Fish and Wildlife Indices in the surrounding area."
          }
          onClick={handleActionClick}
        />
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={6}>
        <TabCallToActionCard
          tabLabel={"Learn About the Assessment"}
          tabLocation={"About"}
          tabText={
            "Learn how the National Coastal Resilience Assessment was created, \
            including descriptions of the Resilience Hubs, Community Exposure Index, \
            and Fish and Wildlife Index."
          }
          onClick={handleActionClick}
        />
      </Grid>
    </Grid>
  );
}
