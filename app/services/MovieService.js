const BASE_URL = 'http://www.omdbapi.com';

module.exports = class MovieService {
  search(searchTerm) {
    return fetch(encodeURI(`${BASE_URL}/?s=${searchTerm}`))
      .then(response => response.json())
      .then(data => {
        if (!data.Search || data.Search.length === 0) return;
        const movies = [];
        data.Search.forEach(result => {
          const movie = {
            id: result.imdbID,
            poster: result.Poster,
            title: result.Title,
            year: result.Year
          };
          movies.push(movie);
        });
        return movies;
      });
  }

  getById(movieId) {
    return fetch(encodeURI(`${BASE_URL}/?i=${movieId}`))
      .then(response => response.json())
      .then(data => {
        const movie = {
          id: data.imdbID,
          poster: data.Poster,
          title: data.Title,
          year: data.Year,
          plot: data.Plot
        };
        return movie;
      });
  }
};
