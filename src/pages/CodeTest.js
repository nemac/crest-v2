import React from 'react';
import { useGetZonalStatsQuery } from '../services/zonalstats';

const App = () => {
  const [skip, setSkip] = React.useState(true);
  const region = 'great_lakes'; // Replace with the desired region value
  const queryData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-85.63179, 44.75796],
              [-85.60149, 44.75326],
              [-85.59717, 44.77625],
              [-85.63557, 44.77048],
              [-85.63179, 44.75796]
            ]
          ]
        }
      }
    ]
  };

  const { data, error, isLoading } = useGetZonalStatsQuery({ region, queryData }, { skip });

  if (isLoading) {
    console.log('loading');
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  // Use the 'response' object here, which will contain the API response

  if (data) {
    return (
      <div>
        {Object.entries(data.features[0].properties.mean).map(([key, value]) => (
          <p key={key}>
            Key: {key}, Value: {value}
          </p>
        ))}
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => {
        setSkip(!skip);
      }}>
        set skip
      </button>
    </div>
  );
};

export default App;

// /* eslint-disable no-console */
// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import { TileLayer, GeoJSON, Polygon, MapContainer, useMap } from 'react-leaflet';
// import PropTypes from 'prop-types';
// import L from 'leaflet';
// import CircularProgress from '@mui/material/CircularProgress';
// import LeafletMapContainer from '../components/Map/LeafletMapContainer';

// const center = [35.6, -82.6];

// const DrawButton = ({ onDraw }) => (
//   <button onClick={onDraw}>
//     Start Drawing
//   </button>
// );
// DrawButton.propTypes = {
//   onDraw: PropTypes.func.isRequired
// };

// const LoaderButton = ({ isLoading, onClick }) => {
//   return (
//     <button onClick={onClick}>
//       {isLoading ? 'Loading...' : 'Show Loader'}
//     </button>
//   );
// };

// function App() {
//   // const [polygonCoords, setPolygonCoords] = useState([]);
//   // const polyRef = React.useRef();
//   // let draw;
//   // if (map && draw === undefined) {
//   //   console.log('bing');
//   //   draw = new L.Draw.Polygon(map, { allowIntersection: false });
//   // }

//   // const map = useMap();
//   const mapRef = React.useRef();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleButtonClick = () => {
//     setIsLoading((prevIsLoading) => !prevIsLoading);
//   };

//   if (mapRef.current !== undefined) {
//     console.log('map ref current', mapRef.current);
//   }

//   // useEffect(() => {
//   //   console.log('map', map);
//   // }, [map]);

//   // const handleDraw = () => {
//   //   if (map) {
//   //     draw.enable();
//   //     // const drawControl = new L.Control.Draw({
//   //     //   draw: {
//   //     //     polygon: true,
//   //     //     marker: false,
//   //     //     circle: false,
//   //     //     circlemarker: false,
//   //     //     rectangle: false
//   //     //   }
//   //     // });
//   //     // map.addControl(drawControl);
//   //     map.on('draw:created', (e) => {
//   //       const layer = e.layer;
//   //       const latLngs = layer.getLatLngs()[0].map(({ lat, lng }) => [lat, lng]);
//   //       setPolygonCoords((previous) => [...previous, latLngs]);
//   //       // draw.disable();
//   //     });
//   //   }
//   // };

//   // if (map) {
//   //   if (loading) {
//   //     map.setStyle({ opacity: 0.1 });
//   //   } else {
//   //     map.setStyle({ opacity: 1 });
//   //   }
//   // }

//   return (
//     <Box sx={{ height: '100%', position: 'relative' }}>
//       <LoaderButton isLoading={isLoading} onClick={handleButtonClick} />
//       {/* <DrawButton onDraw={handleDraw} /> */}
//       {isLoading && (
//         <CircularProgress
//           color="primary"
//           size={80}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)'
//           }}
//         />
//       )}
//         <MapContainer
//           center={center}
//           zoom={10}
//           style={{
//             height: 'calc(100% - 64px)',
//             width: 'calc(100% - 1px)',
//             transition: 'opacity 0.3s ease'
//           }}
//           ref={mapRef}
//         >
//         <TileLayer
//           eventHandlers={{
//             click: () => console.log('click')
//           }}
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {/* {polygonCoords.length > 0 && <Polygon id={'jeff'} ref={polyRef} positions={polygonCoords} />} */}
//         <link rel="stylesheet" href="https://unpkg.com/leaflet@latest/dist/leaflet.css" />
//         <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
//         <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"/>
//       </MapContainer>
//     </Box>
//   );
// }

// export default App;
