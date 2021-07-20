// https://react-lightweight-server.vercel.app/api/v1/stock
// http://localhost:3000/api/v1/stock
// http://localhost:8080/api/vt
export const getStock = () => {
    return fetch(
        'http://localhost:3000/api/v1/stock',{
        method: 'GET'
      }
    )
    .then((response) => response.json())
    .then((data) => data);
};