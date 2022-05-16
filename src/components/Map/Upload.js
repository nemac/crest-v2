/*
Purpose
  handles uploading as shapefile has description of what is needed
  handle all the errors
  - missing one of these .dbf, .shp, shx, .prj
  - Area is too big or too big to process
  - Area is not within any assessment
  - There are too many shapes in the file (max is 30)
  - One or more areas are too big to process
  - Shapefile has invalid geometry probably a self-intersection
  - Shapefile has multiple shapes should we treat them as one area or as separate?
  - Shapefile has multi-shape polygons should we treat them as one area or as separate?

  // TODO: need to add these to sperate component.js files for each action
Child Components
  - upload.js

Libs
  - file converter for zips use v1 in v2 we probably want to reuse
  - file converter for shapefile to geosjon on the browser se v1 in v2 we probably want to reuse

API
  - Not sure yet

State needed
  - Not sure yet

Props
  - Not sure yet
*/
