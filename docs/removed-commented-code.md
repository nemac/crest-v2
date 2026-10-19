# Removed commented-out code

Commented-out code removed from the frontend in October 2026 (audit cleanup). Each block is copied verbatim
from commit `80952712`, the last `develop` commit that still had it. Line numbers refer to that commit.

To see a whole file as it was, run:

```bash
git show 80952712:<path>
```

Most of these belong to two features switched off on purpose in commit `cffd8dba` (2025-03-28, "removes tabs and
soc vul"): the Data & Reports tab and its "final reports" links, and the Social Vulnerability layer in each
legacy region config. The Data & Reports page and components themselves are still in `src/` for now.

## `src/components/About/AboutCommunityExposure.jsx`

Line 36:

```jsx
        {/* For details, review the&nbsp;
        <Link
          value="DataAndReports"
          to="/DataAndReports"
          component={RouterLink}
        >
          final reports
        </Link> */}
```

## `src/components/About/AboutCrest.jsx`

Line 61:

```jsx
          {/* <li>
            Provide advanced GIS users with the ability to download all of the
            final Regional Assessment datasets for use in their own GIS
            platform.
          </li> */}
```

Line 103:

```jsx
        {/* For additional information about the Regional Coastal Resilience
        Assessments and to access final reports, visit the NFWF&nbsp;
        <Link
          target="_blank"
          href="https://www.nfwf.org/programs/national-coastal-resilience-fund/regional-coastal-resilience-assessment"
        >
          Regional Coastal Resilience Assessment page
        </Link>
        . In addition to the Regional Coastal Resilience Assessments, NFWF and
        NOAA partnered with NatureServe to complete Targeted Watershed
        Assessments for eight watersheds throughout the U.S. CREST also features
        the results from each targeted watershed. */}
```

## `src/components/About/AboutFishAndWildlife.jsx`

Line 2:

```jsx
// import { Link as RouterLink } from "react-router-dom";
```

Line 7:

```jsx
// import Link from "@mui/material/Link";
```

Line 50:

```jsx
        {/* For details, review
        the&nbsp;
        <Link
          value="DataAndReports"
          to="/DataAndReports"
          component={RouterLink}
        >
          final reports
        </Link> */}
        {/* . */}
```

## `src/components/About/AboutResilienceHubs.jsx`

Line 32:

```jsx
        {/* For details,
        review the{" "}
        <Link
          value="DataAndReports"
          to="/DataAndReports"
          component={RouterLink}
        >
          final reports
        </Link> */}
```

## `src/components/AnalyzeArea/AnalyzeBarChart.jsx`

Line 280:

```jsx
  // This code may come in handy at some point to sort the actual indices of each chart
  // const sortedChartData = [...chartData];
  // sortedChartData.sort((a, b) => a.chartValue - b.chartValue);
  // const thisChartData = analyzeAreaState.chartSortASC ? sortedChartData : chartData;
```

Line 316:

```jsx
          {/* <tspan x="50%" style={{ fontSize: "1.25rem", fontWeight: "bold" }}> */}
          {/*  {areaName.replace("Hawaii", "Hawai'i")} */}
          {/* </tspan> */}

```

## `src/components/AnalyzeArea/ChartDescriptionCard.jsx`

Line 8:

```jsx
// import { Box, Grid, Typography, IconButton } from "@mui/material";
```

Line 31:

```jsx
// const PopupFooterBox = styled(Box)(({ theme }) => ({
//   // backgroundColor: theme.palette.CRESTLight.dark,
//   // color: theme.palette.CRESTLight.contrastText,
//   padding: theme.spacing(2),
//   whiteSpace: "pre-wrap",
//   fontSize: "0.65rem",
//   borderBottomRightRadius: theme.spacing(0.5),
//   borderBottomLeftRadius: theme.spacing(0.5),
// }));

```


The empty footer grid that held the commented-out "final report" footer, and the `DataAndReportsLink` it used, were
removed after the first pass (lines 30-42 and 98-113 of `80952712`). The bottom corner radius moved to the
description grid.

```jsx
export const DataAndReportsLink = () => {
  const dispatch = useDispatch();
  return (
    <Link
      value="DataAndReports "
      to="/DataAndReports"
      component={RouterLink}
      onClick={() => dispatch(changeActiveTab("DataAndReports"))}
    >
      Data and Reports
    </Link>
  );
};
```

```jsx
      <Grid
        item
        xs={12}
        style={{
          backgroundColor: "#444444",
          border: "1px solid #444444",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      >
        {/* <PopupFooterBox>
          Still have questions? Learn more about what data went into calculating{" "}
          {chartLabel} in the final report at &nbsp;
          <DataAndReportsLink />.
        </PopupFooterBox> */}
      </Grid>
```

## `src/components/AnalyzeArea/ChartHeaderActionButtons.jsx`

Line 1:

```jsx
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
```

Line 49:

```jsx
  // ToggleOff, keeping incase we go back to this
  // ToggleOn, keeping incase we go back to this
```

Line 118:

```jsx
        {/* <Divider sx={{ marginLeft: '6px', marginRight: '6px' }} /> */}
```

Line 122:

```jsx
          // buttonLabel={`Sort by${sortIndices[analyzeAreaState.sortBy]}`}
```

## `src/components/AnalyzeArea/ChartSort.jsx`

Line 1:

```jsx
/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

```

Line 55:

```jsx
  // const handleAscendingClick = () => {
  //   // This is to be combined with handleSortClick... if chartName is already sortBy, do this
  //   dispatch(changeSortDirection());
  // };
```

## `src/components/AnalyzeArea/IdentifyBarChart.jsx`

Line 138:

```jsx
  // This code may come in handy at some point to sort the actual indices of each chart
  // const sortedChartData = [...chartData];
  // sortedChartData.sort((a, b) => a.chartValue - b.chartValue);
  // const thisChartData = analyzeAreaState.chartSortASC ? sortedChartData : chartData;
```

## `src/components/Example/ExampleCard.jsx`

Line 165:

```jsx
      // // Special case to make sure the layer turned on from Step 3 (previousStep 2) is toggled off
      // if (activeStep === 1 && previousStep === 2) {
      //   dispatch(toggleLayer(previousStepLayer));
      //   dispatch(toggleLegend(previousStepLayer));
      //   dispatch(toggleCollapsed(previousStepLayer.ChartInputLabel));
      // }

```

## `src/components/Home/TabCallToActions.jsx`

Line 1:

```jsx
/*
Purpose
  This will hold all the tab call to action cards

Child Components
  - HomePage-TabCallToActionCard.js

Libs
  - None

API
  - None

State needed
  - Not sure yet

Props
  - Tab Name
  - Tab description
  - Tab CTA Label
  - Not sure yet
  - config?
*/
```

Line 60:

```jsx
      {/* <Grid xs={12} sm={12} md={6} lg={3}>
        <TabCallToActionCard
          tabLabel={"Download Data and Access Reports"}
          tabLocation={"DataAndReports"}
          tabText={
            "Download results for each Regional Assessment to use in your \
            own GIS application. Review the regional reports for detailed descriptions \
            of methods, data sources, and results."
          }
          onClick={handleActionClick}
        />
      </Grid> */}
```

## `src/components/NavBar/NavBarTabsBigScreens.jsx`

Line 97:

```jsx
              {/* <LinkTab
                value="DataAndReports"
                to="/DataAndReports"
                {...a11yProps(0, "crest-tab")}
                component={RouterLink}
                label="Data & Reports"
              /> */}
```

## `src/components/NavBar/NavBarTabsSmallScreens.jsx`

Line 1:

```jsx
/*
Purpose
  The main menu (to the tabs) in small screen/mobile

Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  openMenu state for if menu is open or not.
  what menu is currently selected
  - Not sure yet

Props
- Not sure yet
*/
```

Line 257:

```jsx
                {/* <StyledNavPaper square={false} elevation={0}>
                  <StyledListItem
                    selected={navBar.activeTab === "c"}
                    onClick={(event) =>
                      handleClickNavTab(event, "DataAndReports")
                    }
                    to="/DataAndReports"
                    {...a11yProps(0)}
                    component={RouterLink}
                    label="Data & Reports"
                  >
                    Data & Reports
                  </StyledListItem>
                </StyledNavPaper> */}

```

## `src/configuration/regions/alaska.js`

Line 273:

```js
      // "Identifies habitat suitable for species of conservation concern, species with federally-designated Essential Fish Habitat, and/or subsistence species that utilize riverine, lacustrine, and/or nearshore marine habitats (≤20m in depth). High values represent areas important for numerous species.",
```

Line 307:

```js
    // {
    //   id: "AK_SocVulnTMS",
    //   layer: "Social Vulnerability TMS",
    //   label: "Social Vulnerability",
    //   chartOrder: 12,
    //   chartLabel: "Social Vulnerability",
    // chartTipLabel: "Social Vulnerability",
    //   ChartInputLabel: "Community Assets Inputs",
    //   chartCSSSelector: "social_vuln",
    //   chartCSSColor: {
    //     0: "#E9ECEF",
    //     1: "#9EBBD7",
    //     2: "#43309D",
    //     3: "#270B59",
    //   },
    //   url: "https://tiles.resilientcoasts.org/AK_SocVulnIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2022",
    //   opacity: 0.75,
    //   maxNativeZoom: 13,
    //   description:
    //     "Communities that are socially vulnerable according to data from the 2020 Denali Commission’s annual Distressed Communities report or the U.S. Environmental Protection Agency Environmental Justice Mapping and Screening Tool.",
    //   region: "alaska",
    // },
```

## `src/configuration/regions/american_samoa.js`

Line 314:

```js
    // {
    //   id: "AS_SocVulnTMS",
    //   layer: "Social Vulnerability TMS",
    //   label: "Social Vulnerability",
    //   chartOrder: 12,
    //   chartLabel: "Social Vulnerability",
    // chartTipLabel: "Social Vulnerability",
    //   chartCSSColor: {
    //     0: "#E9ECEF",
    //     1: "#88419D",
    //     2: "#88419D",
    //   },
    //   ChartInputLabel: "Community Assets Inputs",
    //   chartCSSSelector: "social_vuln",
    //   url: "https://tiles.resilientcoasts.org/AS_SocVulnIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2020",
    //   opacity: 0.75,
    //   maxNativeZoom: 14,
    //   description:
    //     "Estimates are ranked from low to high, depicting areas of high poverty, vulnerable housing characteristics, and personal disruption due to climate change according to data from the 2010 Decennial Census.",
    //   region: "american_samoa",
    // },
```

## `src/configuration/regions/continental_us.js`

Line 287:

```js
    // {
    //   id: "CONUS_SocVulnTMS",
    //   chartOrder: 11,
    //   layer: "Social Vulnerability TMS",
    //   label: "Social Vulnerability",
    //   chartLabel: "Social Vulnerability",
    //   chartTipLabel: "Social Vulnerability",
    //   chartCSSColor: {
    //     0: "#E9ECEF",
    //     1: "#abd2fa",
    //     2: "#7692ff",
    //     3: "#3a1459",
    //   },
    //   chartInputName: "asset",
    //   ChartInputLabel: "Community Assets Inputs",
    //   chartCSSSelector: "social_vuln",
    //   url: "https://tiles.resilientcoasts.org/SocVulnIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2020",
    //   opacity: 0.75,
    //   maxNativeZoom: 12,
    //   description:
    //     "Communities that are socially vulnerable using the Demographic Index in EPA’s EJSCREEN dataset. Census blocks above the 80th percentile are ranked from low to high, depicting areas of lower median incomes and minority populations.",
    //   region: "continental_us",
    // },
```

## `src/configuration/regions/greatLakes.js`

Line 183:

```js
      // description:
      //   "Index of human community assets that are important to help a community respond to and recover from a flooding event. High values represent areas with dense concentration of critical facilities, infrastructure, and population and social vulnerability.",
```

Line 325:

```js
    // {
    //   id: "GL_SocVulnTMS",
    //   layer: "Social Vulnerability TMS",
    //   label: "Social Vulnerability",
    //   chartOrder: 12,
    //   chartLabel: "Social Vulnerability",
    // chartTipLabel: "Social Vulnerability",
    //   isLegendCustom: false,
    //   chartCSSColor: {
    //     0: "#E9ECEF",
    //     1: "#9EBBD7",
    //     2: "#7A8EF5",
    //     3: "#43309D",
    //     4: "#321699",
    //     5: "#270B59",
    //   },
    //   chartInputName: "asset",
    //   ChartInputLabel: "Community Assets Inputs",
    //   chartCSSSelector: "social_vuln",
    //   url: "https://tiles.resilientcoasts.org/GL_SocVulnIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2022",
    //   opacity: 0.75,
    //   maxNativeZoom: 14,
    //   description:
    //     "Identifies census blocks that are socially vulnerable using the Demographic Index in EPA’s EJSCREEN data. Census blocks above the 50th percentile nationally are ranked from low to high, which indicates census blocks with low income and minority populations.",
    //   region: "great_lakes",
    // },
```

Line 633:

```js
    // {
    //   id: "GL_VisualizationOverlay3TMS",
    //   layer: "Visualization Overlay3 TMS",
    //   label: "Department of Defense Lands",
    //   chartLabel: "Department of Defense Lands",
    // chartTipLabel: "Department of Defense Lands",
    //   isLegendCustom: true,
    //   chartCSSColor: [
    //     {
    //       backgroundColor: "#FCE479",
    //       borderColor: "#FCE479",
    //       label: "Bureau of Land Management",
    //     },
    //     {
    //       backgroundColor: "#FFFFB5",
    //       borderColor: "#FFFFB5",
    //       label: "Bureau of Reclamation",
    //     },
    //     {
    //       backgroundColor: "#FAB4CE",
    //       borderColor: "#FAB4CE",
    //       label: "Department of Defense",
    //     },
    //     {
    //       backgroundColor: "#81CCA8",
    //       borderColor: "#81CCA8",
    //       label: "Fish and Wildlife Service",
    //     },
    //     {
    //       backgroundColor: "#CDEBC5",
    //       borderColor: "#CDEBC5",
    //       label: "Forest Service",
    //     },
    //     {
    //       backgroundColor: "#C9BDDB",
    //       borderColor: "#C9BDDB",
    //       label: "National Park Service",
    //     },
    //   ],
    // },
```

## `src/configuration/regions/guam.js`

Line 328:

```js
    // {
    //   id: "GU_SocVulnTMS",
    //   layer: "Social Vulnerability TMS",
    //   label: "Social Vulnerability",
    //   chartOrder: 12,
    //   chartLabel: "Social Vulnerability",
    // chartTipLabel: "Social Vulnerability",
    //   chartCSSColor: {
    //     0: "#E9ECEF",
    //     1: "#EDF8FB",
    //     2: "#B3CDE3",
    //     3: "#8C96C6",
    //     4: "#88419D",
    //   },
    //   chartInputName: "asset",
    //   ChartInputLabel: "Community Assets Inputs",
    //   chartCSSSelector: "social_vuln",
    //   url: "https://tiles.resilientcoasts.org/GU_SocVulnIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2020",
    //   format: "image/png",
    //   opacity: 0.75,
    //   maxNativeZoom: 14,
    //   description:
    //     "Estimates are ranked from low to high, depicting areas of high poverty, vulnerable housing characteristics, and personal disruption due to climate change according to data from the 2010 Decennial Census.",
    //   region: "guam",
    // },
```

## `src/configuration/regions/hawaii.js`

Line 285:

```js
    // {
    //   id: "HI_SocVulnTMS",
    //   layer: "Social Vulnerability TMS",
    //   label: "Social Vulnerability",
    //   chartOrder: 11,
    //   chartLabel: "Social Vulnerability",
    // chartTipLabel: "Social Vulnerability",
    //   chartCSSColor: {
    //     0: "#E9ECEF",
    //     1: "#9EBBD7",
    //     2: "#7A8EF5",
    //     3: "#43309D",
    //     4: "#321669",
    //     5: "#270B59",
    //   },
    //   chartInputName: "asset",
    //   ChartInputLabel: "Community Assets Inputs",
    //   chartCSSSelector: "social_vuln",
    //   url: "https://tiles.resilientcoasts.org/HI_SocVulnIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2020",
    //   opacity: 0.75,
    //   maxNativeZoom: 14,
    //   description:
    //     "Communities that are socially vulnerable using the Demographic Index in EPA’s EJSCREEN dataset. Census blocks are ranked from low to high, depicting areas of lower median incomes and minority populations.  ",
    //   region: "hawaii",
    // },
```

## `src/configuration/regions/northern_mariana_islands.js`

Line 285:

```js
    // {
    //   id: "CNMI_SocVulnTMS",
    //   layer: "Social Vulnerability TMS",
    //   label: "Social Vulnerability",
    //   chartOrder: 11,
    //   chartLabel: "Social Vulnerability",
    // chartTipLabel: "Social Vulnerability",
    //   chartCSSColor: {
    //     0: "#E9ECEF",
    //     1: "#9EBBD7",
    //     2: "#7A8EF5",
    //     3: "#43309D",
    //     4: "#321669",
    //     5: "#270B59",
    //   },
    //   chartInputName: "asset",
    //   ChartInputLabel: "Community Assets Inputs",
    //   chartCSSSelector: "social_vuln",
    //   url: "https://tiles.resilientcoasts.org/CNMI_SocVulnIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2020",
    //   opacity: 0.75,
    //   maxNativeZoom: 14,
    //   description:
    //     "Estates are ranked from low to high, depicting areas of lower median incomes and minority populations based on 2010 Decennial Census Data and guidance from USEPA EJSCREEN methodology.",
    //   region: "northern_mariana_islands",
    // },
```

## `src/configuration/regions/puertoRico.js`

Line 289:

```js
    // {
    //   id: "PR_SocVulnTMS",
    //   layer: "Social Vulnerability TMS",
    //   label: "Social Vulnerability",
    //   chartOrder: 11,
    //   chartLabel: "Social Vulnerability",
    // chartTipLabel: "Social Vulnerability",
    //   chartCSSColor: {
    //     0: "#E9ECEF",
    //     1: "#9EBBD7",
    //     2: "#7A8EF5",
    //     3: "#43309D",
    //     4: "#321669",
    //     5: "#270B59",
    //   },
    //   chartInputName: "asset",
    //   ChartInputLabel: "Community Assets Inputs",
    //   chartCSSSelector: "social_vuln",
    //   url: "https://tiles.resilientcoasts.org/PR_SocVulnIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2020",
    //   opacity: 0.75,
    //   maxNativeZoom: 14,
    //   description:
    //     "Communities that are socially vulnerable using the Demographic Index in EPA’s EJSCREEN dataset. Census blocks above the 80th percentile are ranked from low to high, depicting areas of lower median incomes and minority populations.",
    //   region: "puerto_rico",
    // },
```

## `src/configuration/regions/usVirginIslands.js`

Line 289:

```js
    // {
    //   id: "USVI_SocVulnTMS",
    //   layer: "Social Vulnerability TMS",
    //   label: "Social Vulnerability",
    //   chartOrder: 11,
    //   chartLabel: "Social Vulnerability",
    // chartTipLabel: "Social Vulnerability",
    //   chartCSSColor: {
    //     0: "#E9ECEF",
    //     1: "#9EBBD7",
    //     2: "#7A8EF5",
    //     3: "#43309D",
    //     4: "#321669",
    //     5: "#270B59",
    //   },
    //   chartInputName: "asset",
    //   ChartInputLabel: "Community Assets Inputs",
    //   chartCSSSelector: "social_vuln",
    //   url: "https://tiles.resilientcoasts.org/USVI_SocVulnIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2020",
    //   opacity: 0.75,
    //   maxNativeZoom: 14,
    //   description:
    //     "Estates are ranked from low to high, depicting areas of lower median incomes and minority populations based on 2010 Decennial Census Data and guidance from USEPA EJSCREEN methodology.",
    //   region: "us_virgin_islands",
    // },
```
