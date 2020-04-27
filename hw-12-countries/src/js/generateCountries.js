import toastr from 'toastr';
import '../../node_modules/toastr/build/toastr.css';
import fetchCountries from './fetchCountries';
import countriesList from '../templates/countries-list.hbs';
import countryInfo from '../templates/country-info.hbs';

const refs = {
  input: document.querySelector('#js-input'),
  section: document.querySelector('#js-country-section'),
};

const debounce = require('lodash.debounce');

function clearRefs() {
  refs.section.innerHTML = '';
}

function createMarkup(obj, templ) {
  clearRefs();
  const markup = templ(obj);
  refs.section.insertAdjacentHTML('beforeend', markup);
}

function handleCountry(e) {
  const input = e.target.value;

  if (!input) {
    clearRefs();
    return;
  }
  console.log(e);

  fetchCountries(input).then(data => {
    if (data.length > 10) {
      clearRefs();
      toastr.error(
        'Too many matches found. Please enter a more specific query!',
        'Error',
        {
          positionClass: 'toast-top-right',
          showDuration: '300',
          hideDuration: '1000',
          extendedTimeOut: '1000',
          showEasing: 'swing',
          hideEasing: 'linear',
        },
      );
    } else if (data.length === 1) {
      createMarkup(data[0], countryInfo);
      console.log(data);
    } else {
      createMarkup(data, countriesList);
      console.log(data);
    }
  });
}

refs.input.addEventListener('input', debounce(handleCountry, 500));
