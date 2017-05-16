module.exports = function renderMovieModalContent({ movie }) {
  return `
<h4>${movie.title}</h4>
<h6>Released in ${movie.year}</h6>
<p>${movie.plot}</p>
`.trim();
};
