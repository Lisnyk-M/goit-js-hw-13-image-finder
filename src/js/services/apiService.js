const baseUrl = 'https://pixabay.com/api/';
const key = '&key=17921001-34fc34d57ac8e12c6e45b531b';
const queryParams = '?image_type=photo&orientation=horizontal';

export default {
    page: 1,
    query: '',
    fetchArticles() {    

        const requestParams = `&q=${this.query}&page=${this.page}&per_page=12`;

        return fetch(baseUrl + queryParams + requestParams + key)
            .then(response => {
                this.incrementPage();
                return response.json();
            })
            .then(parsedResponse => {
                console.log('parsedResponse: ', parsedResponse.hits);
                return parsedResponse.hits;
            })

    },
    get searchQuery() {
        return this.query;
    },
    set searchQuery(string) {
        this.query = string;
    },
    incrementPage() {
        this.page += 1;
    },
    resetPage() {
        this.page = 1;
    }
}

