console.log('Searchcat');

// ========== imports
import axios from "axios";
// from documentation
import iziToast from "izitoast";
// additional
import "izitoast/dist/css/iziToast.min.css";

import { loader, fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common["x-api-key"] = "live_Mj4dcTagklL8IYwLS5vX1smuLDSA63aMtGdtHiFhusTS36p9e2Z8D9EO2I4vA9yv";

// ========== find elements
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

// ========== default function declaration
addOptions();

// ========== defoult function
function addOptions() {

    fetchBreeds()
        .then(breeds => {
            const marckupOptions = breeds.map(breed => {
                return `<option value=${breed.id}>${breed.name}</option>`
            }).join("");
            breedSelect.innerHTML = marckupOptions;
        })
        .catch(error => {
            // handle error
            iziToast.show({
                backgroundColor: '#FD4A3F',
                message: 'Oops! Something went wrong! Try reloading the page!',
                position: 'topRight',
                transitionIn: 'flipInX',
                transitionOut: 'flipOutX',
            });
            console.log(error);
        });
};

function onSelect() {
    breedSelect.disabled = true;
    loader.classList.remove('visually-hidden');
    catInfo.innerHTML = '';

    fetchCatByBreed(breedSelect.value)
        .then(
            response => {
                const [characteristics] = response;
                const { breeds } = characteristics;
                const marckupBreed = breeds.map(breed => {
                return `<img src=${characteristics.url} width=370 />
                        <div>
                          <h2>${breed.name}</h2>
                          <p>${breed.description}</p>
                          <p><b>Temperament: </b>${breed.temperament}</p>
                          <p><b>Origin: </b>${breed.origin}</p>
                        </div>`;
            }).join("");
                catInfo.innerHTML = marckupBreed;
                breedSelect.disabled = false;
        })
        .catch(error => {
            // handle error
            iziToast.show({
                backgroundColor: '#FD4A3F',
                message: 'Oops! Something went wrong! Try reloading the page!',
                position: 'topRight',
                transitionIn: 'flipInX',
                transitionOut: 'flipOutX',
            });
            console.log(error);
        });
};

// ========== listener
breedSelect.addEventListener('change', onSelect);