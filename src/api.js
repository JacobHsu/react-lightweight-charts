export const getStock = () => {
    return fetch(
        'http://localhost:8080/api/vt',{
        method: 'GET'
      }
    )
    .then((response) => response.json())
    .then((data) => data);
};