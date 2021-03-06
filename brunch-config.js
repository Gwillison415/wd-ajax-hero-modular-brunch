// See http://brunch.io for documentation.
module.exports = {
  files: {
    javascripts: { joinTo: 'app.js' },
    stylesheets: { joinTo: 'app.css' }
  },
  plugins: {
    eslint: {
      pattern: /app\/.+\.js$/
    }
  }
};
