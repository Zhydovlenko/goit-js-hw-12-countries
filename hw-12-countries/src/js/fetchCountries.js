'use strict';

// const baseUrl = 'https://restcountries.eu/rest/v2/name';

// export default {
//   fetchCountries(input) {
//     const requestData = `/${input}`;
//     return fetch(baseUrl + requestData)
//       .then(res => res.json())
//       .catch(error => console.log(error));
//   },
// };

export default function fetchCountries(input) {
  return fetch(`https://restcountries.eu/rest/v2/name/${input}`)
    .then(res => res.json())
    .catch(error => console.log(error));
}
