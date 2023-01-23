import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getApi() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '32924777-bff65c7180090804fc87cb2e9';

    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type="photo"&orientation="horizontal"&safesearch="true"&page=${this.page}&per_page=40`
    );
    this.resultsQty = response.data.totalHits;
    this.pagesQty = Math.ceil(this.resultsQty / this.per_page);
    return response.data.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  loadMoreBtnEnable() {
    this.page < Math.ceil(this.totalHits / this.per_page);
  }

  get query() {
    return this._searchQuery;
  }

  set query(newQuery) {
    this._searchQuery = newQuery;
  }
}
