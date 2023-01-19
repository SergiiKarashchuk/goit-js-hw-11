import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './newsApiService';

const axios = require('axios');

// pixabay.com
// Your API key: 32924777-bff65c7180090804fc87cb2e9

const form = document.querySelector('.search-form');
form.addEventListener('submit', onSearch);
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', onLoadMore);

const newsApiService = new NewsApiService();
console.log(newsApiService);

function onSearch(evt) {
  evt.preventDefault();
  newsApiService.searchQuery = evt.currentTarget.elements.searchQuery.value;
  newsApiService.getApi();
}

function onLoadMore() {
  newsApiService.getApi();
}

// const refs = {
//   form: document.querySelector('.search-form'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

// refs.form.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

// let searchQuery = '';

// function onSearch(evt) {
//   evt.preventDefault();
//   searchQuery = evt.currentTarget.elements.searchQuery.value;

//   const options = {
//     headers: {
//       API_KEY: '32924777-bff65c7180090804fc87cb2e9',
//     },
//   };
//   const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type="photo"&orientation="horizontal"&safesearch="true"`;

//   fetch(url, options)
//     .then(response => response.json())
//     .then(console.log);
// }

// function onLoadMore() {
//   const options = {
//     headers: {
//       API_KEY: '32924777-bff65c7180090804fc87cb2e9',
//     },
//   };
//   const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type="photo"&orientation="horizontal"&safesearch="true"`;

//   fetch(url, options)
//     .then(response => response.json())
//     .then(console.log);
// }
