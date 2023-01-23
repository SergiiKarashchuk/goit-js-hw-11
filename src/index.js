import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './newsApiService';
import LoadMoreBtn from './load-more-btn';

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
  clearImagesContainer();
  newsApiService.searchQuery = evt.currentTarget.elements.searchQuery.value;
  if (newsApiService.searchQuery.trim() === '') {
    Notiflix.Notify.info('Enter your request');
    return;
  }

  newsApiService.getApi().then(hits => {
    newsApiService.resetPage();
    imagesContainer.insertAdjacentHTML('beforeend', createInfoMurkup(hits));

    gallerySimpleLightbox.refresh();
    loadMoreBtn.show();
    loadMoreBtn.enable();
    if (hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.hide();
    }
    if (hits.length < 40 && hits.length > 1) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
    }
    console.log(hits);
  });
}

function onLoadMore() {
  newsApiService.incrementPage();
  console.log(newsApiService);
  newsApiService.getApi().then(hits => {
    imagesContainer.insertAdjacentHTML('beforeend', createInfoMurkup(hits));
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
// function appendImagesMarkup(hits) {
//   imagesContainer.insertAdjacentHTML('beforeend', createInfoMurkup(hits));
// }

function clearImagesContainer() {
  imagesContainer.innerHTML = '';
}
