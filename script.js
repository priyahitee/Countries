const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector(".countries");

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
};

// Consumeing promises
// chaining promises
// Handling Rejected Promises
// Throwing Errors Manually

const getJSON = (url, errorMsg= 'Something went wrong') => {
    return fetch(url)
    .then(response => {
        //if response.ok is false, undefined location in api list throw error message
        if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);
        return response.json();  
    });
};

const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

const getCountryData = function (country) {
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`, 'Country not found')
      .then(function (data) {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];
         //if country has no neighbouring country throw error message
        if (!neighbour) throw new Error('No neighbour found!');
        return  getJSON(
          `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`, 'Country not found'
        );
      })
      .then(function (data) {
        renderCountry(data, "neighbour");
      })
      .catch(err => {
        //Handling offline network connection 
          renderError(`Something went wrong 💥💥 ${err.message}. Try again!`)
      })
      .finally(() => {
          countriesContainer.style.opacity = 1;
        });
  };


btn.addEventListener('click', function () {
    var inputValue = document.getElementById('inputField').value;
    getCountryData(inputValue);
  });


  // const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       renderCountry(data, "neighbour");
//     })
//     .catch(err => {
//         renderError(`Something went wrong 💥💥 ${err.message}. Try again!`)
//     })
//     .finally(() => {
//         countriesContainer.style.opacity = 1;
//       });
// };


