module.exports = function renderMovieCard({ movie }) {
  return `
<div class="card hoverable">
  <div class="card-content center">
    <h6 class="card-title truncate" data-position="top" data-tooltip="${movie.title}" data-tooltip-id="${movie.id}">${movie.title}</h6>
    <img class="poster" src="${movie.poster}" alt="${movie.title}">
  </div>
  <div class="card-action center">
    <a class="waves-effect waves-light btn modal-trigger" href="#${movie.id}">Plot Synopsis</a>
  </div>
</div>
`.trim();
};
