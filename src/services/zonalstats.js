import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { betaZonalStatsEndpoint } from '../configuration/config';

export const useZonalStatsMutation = (setData) => {
  const mutation = useMutation({
    mutationFn: (data) => {
      // console.log('sending up : ', data);
      const url = betaZonalStatsEndpoint.concat(`/?region=${encodeURIComponent(data.region)}`);

      return axios.post(url, data.featureGroup);
    },
    onSuccess: (data) => {
      // console.log('inside mutation', data);
      setData(data.data);
    },
    onError: (data) => {
      // console.log('mutation failed: ', data);
    },
    retry: 2

  });

  const mutateFunction = (dataArray) => dataArray.map(
    (dataBundle) => mutation.mutateAsync(dataBundle).then((mutationResult) => {
      mutationResult.data.index = dataBundle.index;
      // console.log('setting data to: ', mutationResult);
      setData(mutationResult.data);
    })
  );

  return mutateFunction;
};
