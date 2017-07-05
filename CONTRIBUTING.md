Contributing
===

This project follows [Git-Flow](http://nvie.com/posts/a-successful-git-branching-model/), and as such has ``master`` and ``develop`` branches.

## Prerequisites

1. Install the appropriate [EditorConfig](http://editorconfig.org) plugin for your IDE/editor. This helps keep the code style consistent.
3. `npm install`

## Running the tests

- All tests: `npm test`
- Just the browser ones: `phantomjs tests/phantom.js`
- Just the Node ones: `node tests/node.js`

## Before creating a pull request

Make sure you do the following:

- *If using Node 4*, `css-sprite` is deprecated and has a dependency `lwip` which doesn't build on Node 4. So you will need to  `npm install css-sprite --ignore-scripts`, go into `./node_modules/css-sprite/package.json` to `lwip@0.0.8` and `npm install` on the main project again. See https://github.com/aslansky/css-sprite/issues/73
- Run `npm run build`

Note: The build script will generate new `*.min.{css,js}` files. If, for example, you only changed the JavaScript then don't bother committing `emojify.min.css`.

## Releasing & Publishing

Before a release, generate a commit log:

```
git log --pretty=format:"- %s" >> log.md
```

If you have rights to publish to npm, do the following first:

- Run `npm run task-update`. This will update the project with the latest emoji from [emoji-cheat-sheet.com](http://www.emoji-cheat-sheet.com).
- Run `npm run build`
- Run `npm run task-bump`
- Run `npm publish`
