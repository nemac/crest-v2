import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { betaZonalStatsEndpoint } from '../configuration/config';

export const useZonalStatsMutation = (setData) => {
  const mutation = useMutation({
    mutationFn: (data) => {
      const url = betaZonalStatsEndpoint.concat(`/?region=${encodeURIComponent(data.region)}`);
      // console.log('in zonal stats processing: ', data);
      return axios.post(url, data.featureGroup);
    },
    onSuccess: (data) => {
      // console.log('SUCCESS: ', data);
    },
    onError: (data) => {
      // console.log('ERROR: ', data);
    },
    retry: 2

  });

  const mutateFunction = (dataArray) => dataArray.map(
    (dataBundle) => mutation.mutateAsync(dataBundle).then((mutationResult) => {
      mutationResult.data.index = dataBundle.index;
      setData(mutationResult.data);
    })
  );

  return mutateFunction;
};
