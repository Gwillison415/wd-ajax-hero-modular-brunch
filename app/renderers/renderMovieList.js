const renderMovieCard = require('./renderMovieCard');

function renderMovieListItem({ movie }) {
  return `
<div class="col s6">
  ${renderMovieCard({ movie })}
  <div class="modal" id="${movie.id}">
    <div class="modal-content" />
  </div>
</div>
`;
}

module.exports = function renderMovieList({ movies }) {
  return movies.reduce(
    (html, movie) => html + renderMovieListItem({ movie }),
    ''
  );
};
