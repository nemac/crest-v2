/*
Purpose
  The About card/tab text htmnl for about crest

Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yets

State needed
  - Not sure yet

Props
  - Not sure yet
*/
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

import { CrestList } from '../All/StyledComponents';

export default function AboutCrest(props) {
  return (
    <div>
      <Typography variant="h5" component="div" px={3} py={1} gutterBottom>
        About CREST
      </Typography>
      <Divider variant="middle" />
      <Typography variant="body" component="div" px={3} pt={3} pb={1} gutterBottom>
        The Regional Coastal Resilience Assessments were developed by the National Fish
        and Wildlife Foundation (NFWF), in partnership with the National Oceanic and
        Atmospheric Administration (NOAA) and UNC Asheville’s National Environmental
        Modeling and Analysis Center (NEMAC) and in consultation with the U.S. Army Corps
        of Engineers and NatureServe. The Coastal Resilience Evaluation and Siting Tool
        (CREST) provides an interactive platform to view, download, and interact with
        the results of the Regional Coastal Resilience Assessments.
      </Typography>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        The Regional Assessments seek to identify areas on the landscape where the implementation of
        nature-based solutions have potential to maximize benefits for human community resilience
        to flooding threats and fish and wildlife habitat. In 2019, NFWF launched CREST to share
        results of the Regional Assessments for the U.S. Atlantic, Gulf of Mexico, and Pacific
        coastlines, which use a standardized methodology to combine information about flooding
        threats, human community assets, and fish and wildlife species to identify Resilience Hubs.
        The Regional Assessments have since expanded to include Puerto Rico, the U.S. Virgin
        Islands, the Northern Mariana Islands, Hawaii, Guam, American Samoa, and Alaska. Owing to
        the uniqueness of each region, the methods will continue to be refined and enhanced. CREST
        will be updated once the U.S. U.S. Great Lakes Regional Assessment is complete and as other
        Regional Assessments are updated.
      </Typography>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        CREST provides an online, interactive environment to access Regional Assessment results.
        It allows users to:
        <CrestList>
          <li>
            View and explore key Assessment inputs and results within their own areas of interest,
          </li>
          <li>
            Analyze potential project sites and quantify results from the Assessment models,
          </li>
          <li>
            Search Resilience Hubs to identify potential project sites, and
            </li>
          <li>
            Provide advanced GIS users with the ability to download all of the final Regional
            Assessment datasets for use in their own GIS platform.
          </li>
        </CrestList>
      </Typography>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        CREST is intended to be used as a screening-level tool designed to help identify areas
        that may be well suited for nature-based solutions. As with all GIS analyses, site-level
        assessments are required to validate results and develop detailed design and engineering
        plans. The results are limited by those data available at the time of analysis and by the
        underlying accuracy and precision of the original data sources; therefore, the Regional
        Assessments may not capture all flood-related threats, community assets, fish and wildlife
        resources, or areas of open space. For instance, significant data gaps exist in many regions
        including limited coastal flood-related and soil datasets across Alaska, limited storm surge
        data for Pacific Island regions, and lack of data that incorporate recent land subsidence in
        American Samoa. Resilience Hubs are not intended to identify all potential opportunities for
        nature-based solutions, but rather are meant to help assess potential projects based on dual
        benefits for habitats and human communities.
      </Typography>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        For additional information about the Regional Coastal Resilience Assessments and to access
        final reports, visit the NFWF&nbsp;
        <Link target="_blank" href="https://www.nfwf.org/programs/national-coastal-resilience-fund/regional-coastal-resilience-assessment">
          Regional Coastal Resilience Assessment page
        </Link>.
        In addition to the Regional Coastal Resilience Assessments, NFWF and NOAA partnered with
        NatureServe to complete Targeted Watershed Assessments for eight watersheds throughout the
        U.S. CREST also features the results from each targeted watershed.
      </Typography>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        Please send questions, comments, or issues to <Link href="mailto:gdobson@unca.edu">gdobson@unca.edu</Link>.
      </Typography>
     </div>
  );
}
