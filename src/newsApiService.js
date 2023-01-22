export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getApi() {
    console.log(this);
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '32924777-bff65c7180090804fc87cb2e9';

    return fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type="photo"&orientation="horizontal"&safesearch="true"&page=${this.page}&per_page=40`
    ).then(response => {
      //   console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json().then(data => {
        this.incrementPage();
        return data.hits;
      });
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this._searchQuery;
  }

  set query(newQuery) {
    this._searchQuery = newQuery;
  }
}
