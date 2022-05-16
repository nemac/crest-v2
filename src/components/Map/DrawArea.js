/*
Purpose
  Draws an area on the map
  will also make the leaflet draw menu appear or we need to create a new one that mimics the figma designated
  this will be a custome component
  we may need to add child for the drawing actions which include:
    - finish
    - delete last point
    - cancel

  is a leaflet button so needs access to leaflet object can be a challenge in React

 handle errors:
    - Area is too big or too big to process
    - Area is not within any assessment
    - probably others

Child Components
  - map.js

Libs
  - leaflet
  - leaflet draw

API
  - New api create a saved state JSON object with a unique id to share

State needed
  - zonal stat GEOJSON returned from API

Props
  - Not sure yet
*/
