import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './newsApiService';
import LoadMoreBtn from './load-more-btn';

const axios = require('axios');

const form = document.querySelector('.search-form');
form.addEventListener('submit', onSearch);

const imagesContainer = document.querySelector('.gallery');
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
const newsApiService = new NewsApiService();
console.log(newsApiService);

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

function onSearch(evt) {
  evt.preventDefault();
  newsApiService.searchQuery = evt.currentTarget.elements.searchQuery.value;
  if (newsApiService.searchQuery === '') {
    return alert('Enter your request');
  }
  loadMoreBtn.show();
  loadMoreBtn.disable();

  newsApiService.getApi().then(hits => {
    appendImagesMarkup(hits);
    gallerySimpleLightbox.refresh();
    loadMoreBtn.enable();
  });
}

function onLoadMore() {
  loadMoreBtn.disable();
  newsApiService.getApi().then(hits => {
    appendImagesMarkup(hits);
    gallerySimpleLightbox.refresh();
    loadMoreBtn.enable();
  });
}
function createInfoMurkup(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
<img class="gallery__image" src="${webformatURL}" alt="${tags}" width = "150" heigh = "100" loading="lazy" />
</a>
<div class="info">
  <p class="info-item">
    <b>Likes</b>
    ${likes}</p>
  <p class="info-item">
    <b>Views</b>
    ${views}</p>
  <p class="info-item">
    <b>Comments</b>
  ${comments}</p>
  <p class="info-item">
    <b>Downloads</b>
    ${downloads}</p>
</div>
</div>`;
      }
    )
    .join('');
}
function appendImagesMarkup(hits) {
  imagesContainer.insertAdjacentHTML('beforeend', createInfoMurkup(hits));
}
