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
      <button onClick={() => { setSkip(!skip); }}>
        set skip {skip}
      </button>
    </div>
  );
};

export default App;
