import axios from "axios";
// from documentation
import iziToast from "izitoast";
// additional
import "izitoast/dist/css/iziToast.min.css";

export const loader = document.querySelector('.loader');

export function fetchBreeds() {
    const urlBreeds = 'https://api.thecatapi.com/v1/breeds';

    return axios.get(urlBreeds)
        .then(response => {
            // handle success
            loader.classList.add('visually-hidden');
            return response.data;
        });
};

export function fetchCatByBreed(breedId) {
    const urlBreedId = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

    return axios.get(urlBreedId)
        .then(response => {
            // handle success
            loader.classList.add('visually-hidden');
            return response.data;
        });
};