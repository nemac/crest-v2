export const retrieveShapeFile = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
  console.log(response);
  const data = await response.json();
  return data;
};
