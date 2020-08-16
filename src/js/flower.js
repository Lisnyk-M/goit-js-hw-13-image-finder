
import newsService from './services/apiService';
import articleListItemsTemplate from '../templates/article-list-item.hbs';

const refs = {
    searchForm: document.querySelector('#search-form'),
    articleList: document.querySelector('#article-list'),
    loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
    listCards: document.querySelector('.gallery')
}

refs.searchForm.addEventListener('submit', searchFormSubmitHendler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHendler);

function loadMoreBtnHendler() {
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    // refs.articleList.lastElementChild.scrollIntoView(!top);
    console.log('last child: ', refs.listCards.lastElementChild);
    const heightLastLi = refs.listCards.lastElementChild.offsetHeight;
  
    newsService.fetchArticles().then(articles => {
        const markup = buildListItemsMarkup(articles);
        insertListItems(markup);
        window.scrollTo({
            left: 0,
            top: scrollHeight - heightLastLi,
            behavior: 'smooth',
        })
    });
}

function searchFormSubmitHendler(e) {
    e.preventDefault();

    console.dir(e.currentTarget);
    // const searchQuery = e.currentTarget.elements.query.value;
    newsService.resetPage();
    const form = e.currentTarget;
    const input = form.elements.query;
    const inputValue = input.value;
    clearListItems();
    newsService.searchQuery = inputValue;


    newsService.fetchArticles().then(articles => {
        const markup = buildListItemsMarkup(articles);
        console.log('articles: ', articles);
        insertListItems(markup);
    });
    input.value = '';
}

function insertListItems(items) {
    refs.listCards.insertAdjacentHTML('beforeend', items)
}

function buildListItemsMarkup(items) {
    return articleListItemsTemplate(items);
}

function clearListItems() {
    refs.articleList.innerHTML = '';
    refs.listCards.innerHTML = '';
}

