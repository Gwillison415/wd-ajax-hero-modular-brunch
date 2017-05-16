# Ajax Hero (Modular Programming with Brunch)

Please refer to the [original exercise](https://github.com/gSchool/wd-ajax-hero) for additional context.

In this exercise, you're tasked with implementing a basic web application to make HTTP requests to the OMDb API and update the DOM.

## Purpose

In this repo, we demonstrate how to solve this problem using modular programming with [Brunch](http://brunch.io), a simple module bundler, jQuery, and Materialize CSS.

## Using Brunch

Below you'll find some tips for getting started with Brunch. I recommend skimming Brunch's [documentation](http://brunch.io/docs/getting-started) for further information.

### Getting Started

To use Brunch, first make sure the `brunch` command line utility is installed (globally), as follows:

```bash
npm -g i brunch
```

Create a Brunch project skeleton using `brunch`'s scaffolding tool, as follows:

```bash
brunch new -s simple wd-ajax-hero-modular-brunch
```

All subsequent commands should be executed from within the project directory:

```bash
cd wd-ajax-hero-modular-brunch
```

Brunch's scaffolding tool will create a few superfluous README files that you can simply remove to avoid clutter, as follows:

```bash
rm app/README.md
rm app/assets/README.md
```

You'll want to update your project's `package.json` information, as follows:

```bash
sed -i "" "s/brunch-app/wd-ajax-hero-modular-brunch/g" package.json    # Change the project name
sed -i "" "s/Brunch.io application/Ajax Hero/g" package.json           # Change the project description
sed -i "" "s/Brunch/nestor.toro@galvanize.com/g" package.json          # Change the project author (use your own email address)
```

### Directory Structure

| File / Directory | Description |
| --------- | ----------- |
| `brunch-config.js` | Your project's Brunch configuration file. See all possible options [here](http://brunch.io/docs/config). |
| `app/*` | Your source files (which can contain both JS and CSS). You can organize your files into any sub-directory structure you'd like, Brunch will take care of the rest. |
| `app/initialize.js` | The default entry point for your application. It will be invoked by your `index.html` file. |
| `app/assets/*` | Your static source files which are copied as-is to the `public/` output directory. Note, these files are _not_ touched or processed by the Brunch build process. |
| `public/*` | The build output directory. You should not make any changes directly to the files in this directory. |
| `node_modules/*` | Your third-party `npm` dependencies |

### Setting Up ESLint

We recommend using ESLint. You can have Brunch automatically lint your JavaScript source code (with ESLint) by configuring the ESLint Brunch plugin.

First, install `eslint` and `eslint-brunch`, as follows:

```bash
npm i -S eslint eslint-brunch
```

Then, update your Brunch configuration (`brunch-config.js`), as follows:

```js
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
```

Basically, you're telling Brunch to use the ESLint plugin to lint all JS source files as they are being bundled.

Lastly, you'll want to setup an ESLint configuration file (`eslintrc.json`) at the root of your project directory, as follows:

```json
{
  "root": true,
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jquery": true
  }
}
```

ESLint configuration is beyond the scope of this exercise. Please refer to ESLint's excellent [documentation](http://eslint.org/docs/user-guide/configuring) for more information.

### Development Server

To run Brunch's development server, run the command:

```bash
npm start
```

In addition to bundling your code into a single `app.js` (and `app.css`) file, this will start a development server which you can use for development purposes.

### Production Build

To build for production deployment, run the command:

```bash
npm run build
```

You can deploy the contents of the build directory (`public/*`) to a web server for hosting (e.g., Amazon S3).

### Unit Testing

Coming Soon

## Modular Code Design

As discussed in the breakout session, there are generally 4 key concerns in front-end web development:
- Remote Data Access & Transformation
    - _i.e., How do you interact with a remote API?_
- Local State Management
    - _i.e., Once you’ve fetched some data from a remote API, where do you put it? How do you keep it in-sync with the server?_
- Event Handling / User Actions
    - _i.e., How do you respond to user interaction (button presses, form submissions, etc.)?_
- Rendering / UI
    - _i.e., How do you update what the user sees?_

In this project, we're using the following separation of concerns:

| Source File(s) | Description |
| -------------- | ----------- |
| `app/pages/IndexPage` | The primary controller of the application, responsible for _coordinating_ between user interaction, remote data access, and local state management. |
| `app/services/MovieService` | A service I've defined to handle all interaction with the remote movie API. The service's interface offers two capabilities: searching for movies given a search term (MovieService.search) and getting a specific movie by ID (MovieService.getById). Notice that the interface of the service does not expose implementation details. In other words, the users of MovieService have no idea it's using the Open Movie Database. In the future, we could choose to reimplement the service to use a different API (e.g., Netflix, IMDB, etc.). |
| `app/renderers/*` | These are pure JavaScript function that take input and return HTML, which can then be converted into DOM elements that are attached to the appropriate mount points using jQuery's `.html()` utility. |

## Modular Programming Notes

### What is modular programming (a.k.a. modularization) in the context of software development?

Modular programming is a technique to divide a software program (or application or system) into smaller, discrete, independent modules (or sub-programs), each of which is responsible for a specific aspect of functionality.

Commonly, modules are composed of other modules, creating dependencies between modules. That said, in practice, you want to limit the number of dependencies any one module has on other modules.

A module’s interface defines/expresses its capabilities (i.e., it's API) and is the contract between the module itself and its user.

### Types of modularization

Generally speaking, there are two types of modularization:
- Logical: this happens in your code and is part of the language. _e.g., Functions, Classes (OOP)_
- Physical: this is about organizing your source code files.
  - In a front-end web application (which runs in the browser runtime), you can split up your code into multiple JS files each of which is included by separate scripts tags (`<script>`) in your HTML.
  - In a Node application (which runs within the `node` runtime), you can split up your code into "modules" and import them using the `require` function (e.g., `request(‘request’)`). Node has a built-in module systems based on the Common JS module format.

### What are some of the benefits of modular programming?

- Breaks down complexity (divide and conquer)
- Clear separation of concerns (SoC)
- Single responsibility per module
- Facilitates changes
- Promotes programming to interfaces
  - Black box - Don’t care about the implementation details
- Easier to read and understand
- Easier to test
- Easier to reuse
- Easier to maintain
- More efficient team development (work can be dividing around modules)

### How do you modularize front-end web applications?
- There is no single / standard way of doing it
- Based on years of experience and seeing commonly used patterns
- Often times, the frameworks you use (e.g., Backbone, React, Angular) and the communities around those frameworks (who establish conventions and best practices) influence or impose a particular way of modularizing your code
  - This is nice because you don't have to think about it as much.
  - This can be problematic whenever you're building something that doesn't align well with the established conventions and best practices.

Generally speaking, a front-end web application has these concerns. Please refer to the [previous section](#Modular Programming Notes).

### Module Bundlers

Module Bundlers (a type of front-end build tools), allow you to use Node-style Common JS module format within the browser, instead of having to include dozens of `<script>` tags.

[Webpack](https://webpack.js.org/) is the de facto standard of module bundlers and, at the time of this writing, the most popularly used module bundler. However, it's quite complex and has a steep learning curve.

[Brunch](http://brunch.io) is a much simpler module bundler for beginners.
