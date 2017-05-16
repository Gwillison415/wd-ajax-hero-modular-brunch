module.exports = function renderIndexPage() {
  return `
<div class="navbar-fixed">
  <nav>
    <div class="nav-wrapper">
      <div class="container">
        <a href="index.html" class="brand-logo center">
          <i class="material-icons left">movie_filter</i>
          <span>Ajax Hero</span>
        </a>
      </div>
    </div>
  </nav>
</div>
<main class="container">
  <div class="row">
    <form>
      <div class="col offset-s2 s7">
        <div class="input-field">
          <input type="text" placeholder="Enter movie title e.g. Jumanji" id="search" name="search" />
        </div>
      </div>
      <div class="col s3">
        <button class="btn-large waves-effect waves-light" type="submit" name="action">
          <i class="material-icons right">search</i>
          <span>Search</span>
        </button>
      </div>
    </form>
  </div>
  <div id="listings" class="row"></div>
</main>
<footer class="page-footer">
  <div class="container">
    <div class="row">
      <div class="col s12">
        <h5 class="grey-text text-lighten-4">
          <i class="material-icons left">movie_filter</i>
          <span>Ajax Hero</span>
        </h5>
        <p class="grey-text text-lighten-4">
          <span>Courtesy of the</span>
          <a id="omdb" class="grey-text text-lighten-4" href="http://omdbapi.com/">Open Movie Database</a>
        </p>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="container">© 2016 Ajax Hero</div>
  </div>
</footer>
`.trim();
};
