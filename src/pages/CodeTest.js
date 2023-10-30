import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation
} from '@tanstack/react-query';
import axios from 'axios';
import { betaZonalStatsEndpoint, prodZonalStatsEndpoint } from '../configuration/config';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const mutation = useMutation({
    mutationFn: (data) => {
      const url = betaZonalStatsEndpoint.concat(`/?region=${encodeURIComponent(data.region)}`);
      return axios.post(url, data.post);
    },
    onSuccess: (data, error, variables, context) => {
      // Called three times
      console.log('inside mutation', data);
    }
  })

  const guamData = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[144.74343538284302,13.392604613355415],[144.74077463150024,13.38932734988023],[144.74549531936646,13.386300538244093],[144.7498512268066,13.391414784005304],[144.7441864013672,13.392813354740085],[144.74343538284302,13.392604613355415]]]}}]}';
  const conusData = '{"type":"FeatureCollection","name":"test-ar","features":[{"type":"Feature","properties":{"id":"conus_poly"},"geometry":{"type":"Polygon","coordinates":[[[-80.01149654388428,32.887677980874706],[-80.01911401748657,32.88337138447869],[-80.01553058624268,32.87764094428261],[-80.00417947769165,32.882578515468],[-80.01149654388428,32.887677980874706]]]}}]}';
  const prData = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"id":"puerto_rico_poly"},"geometry":{"type":"Polygon","coordinates":[[[-66.19537353515625,18.374075820054482],[-66.2750244140625,18.312810846425442],[-66.15966796875,18.272390159624983],[-66.08963012695312,18.380592091462194],[-66.2091064453125,18.4209874751591],[-66.19537353515625,18.374075820054482]]]}}]}';

  const dataOne = {post: guamData, region: 'guam'};
  const dataTwo = {post: conusData, region: 'continental_us'};
  const dataThree = {post: prData, region: 'puerto_rico'};

  const mutateFunction = () => {
    [dataOne, dataTwo, dataThree].forEach((dataBundle) => {
      mutation.mutate(dataBundle, {
        onSuccess: (data, error, variables, context) => {
          // Will execute only once, for the last mutation (Todo 3),
          // regardless which mutation resolves first
          console.log('inside the button click', data)
        },
      })
    })
  }

  return (
    <div>
      <button
        onClick={() => {
          mutateFunction();
        }}
      >
        Send it over
      </button>
    </div>
  )
}
