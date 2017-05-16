const MovieService = require('../services/MovieService');
const renderIndexPage = require('../renderers/renderIndexPage');
const renderMovieList = require('../renderers/renderMovieList');
const renderMovieModalContent = require('../renderers/renderMovieModalContent');

module.exports = class IndexPage {
  constructor(root) {
    this._root = root;

    this._movieService = new MovieService();

    this._movieIds = [];
    this._moviesById = {};

    // Event handlers must be explicitly bound to this
    this._handleSearch = this._handleSearch.bind(this);
    this._handleClickPlotButton = this._handleClickPlotButton.bind(this);
  }

  render() {
    $(this._root).html(renderIndexPage());
    $(this._root).find('form').submit(this._handleSearch);
  }

  _handleSearch(event) {
    event.preventDefault();

    const form = event.target;
    let searchTerm = form.search.value ? form.search.value.trim() : '';

    if (searchTerm === '') return;

    this._movieService.search(searchTerm).then(movies => {
      // cache resulting movies as page state (i.e., as an instance variables on the page object)
      this._movieIds = [];
      this._moviesById = {};
      movies.forEach(movie => {
        this._movieIds.push(movie.id);
        this._moviesById[movie.id] = movie;
      });
      this._updateMovieList();
    });
  }

  _updateMovieList() {
    const movies = this._movieIds.map(movieId => this._moviesById[movieId]);
    $(this._root).find('#listings').empty().html(renderMovieList({ movies }));
    $(this._root).find('.modal-trigger').leanModal();
    $(this._root).find('.modal-trigger').click(this._handleClickPlotButton);
  }

  _handleClickPlotButton(event) {
    event.preventDefault();

    const trigger = event.target;
    const movieId = trigger.hasAttribute('href')
      ? trigger.getAttribute('href').trim().replace('#', '')
      : '';

    if (movieId === '') return;

    if (this._moviesById[movieId] && this._moviesById[movieId].plot) return;

    this._movieService.getById(movieId).then(movie => {
      this._moviesById[movieId] = movie;
      this._updateMovieModalContent(movie);
    });
  }

  _updateMovieModalContent(movie) {
    $(this._root)
      .find(`#${movie.id} .modal-content`)
      .empty()
      .html(renderMovieModalContent({ movie }));
  }
};
