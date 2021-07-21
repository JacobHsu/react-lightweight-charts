// https://react-lightweight-server.vercel.app/api/v1/stock
// http://localhost:3000/api/v1/stock
// http://localhost:8080/api/vt
export const getStock = () => {
  const API = process.env.REACT_APP_API;
  return fetch(API, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => data);
};
