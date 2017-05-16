const IndexPage = require('./pages/IndexPage');

$(document).ready(() => {
  const indexPage = new IndexPage(document.getElementById('root'));
  indexPage.render();
});
