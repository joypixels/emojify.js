# emojify.js

[![NPM version][ico-npm]][package-npm]
[![Bower version][ico-bower]][package-bower]
[![MIT Licensed][ico-license]][license]
[![Gitter chat][ico-gitter]][gitter]

---

Master | Develop
--- | ---
[![Master branch build status][ico-build]][travis] | [![Develop branch build status][ico-build-dev]][travis]

[![Browser Results](https://ci.testling.com/hassankhan/emojify.js.png)](https://ci.testling.com/hassankhan/emojify.js)

A swiss-army-knife for all emoji, in Javascript. Used by [Gitter](https://gitter.im/)

The emoji keywords are as described by [emoji-cheat-sheet.com](http://www.emoji-cheat-sheet.com).

Go to this project's [GitHub pages](http://hassankhan.github.com/emojify.js) to see the code in action.

## Features

- Fast
- Awesome
- Made from unicorn blood
- Available on a CDN **(gasp)**
- Converts emoticons like `:) :( :'(`
- Allows customisation of processed emoji
- Includes a [sample `.htaccess` file](.htaccess) for caching Javascript and CSS
- Switchable emoji sets **(SOON!)**

## Installation

### Using CDNJS **[SOON]**

Add this to the rest of your stylesheet imports:
Then add this to your Javascript code:

### Using Bower

`bower install emojify.js#~1.0 --save`

### Using NPM

`npm install emojify.js#~1.0  --save`

## Setup and customisation

To set configuration options, use `emojify.setConfig()` and a JSON object as a parameter with any of the following attributes:

Option | Default | Description
--- | --- | ---
`emojify_tag_type` | `null` | When set, emojify uses this element with the class `emoji emoji-#{emojiname}` instead of an `img` with a `src` attribute.  Example valid values: `div`, `span`
`only_crawl_id` | `null` | Restricts searching for emojis to a specified element & it's children. If null, and no object is passed to `run()`, `document.body` is used
`img_dir` | `'images/emoji'` | Defines the path to the emoji images
`ignore_emoticons` | `false` | If `true`, only convert emoji like `:smile:` and ignore emoticons like `:)`
`ignored_tags` | `{'SCRIPT': 1,'TEXTAREA': 1,'A': 1,'PRE': 1,'CODE': 1}` | A list of elements that you don't want emojified

For example:

```js
emojify.setConfig({emojify_tag_type : 'div'});
emojify.run();
```

You can optionally pass an object to `emojify.run()` to restrict the **emojification** to that object only: `emojify.run(document.getElementById('my-element'))`

You can also use `emojify.replace()` to replace emoji/emoticon keywords in plain Javascript strings:

```js
emojify.replace('I am happy :)');
```

By default, emojify.js uses the internal function `defaultReplacer()` to replace emoji. You can override this behaviour by supplying your own "replacer" callback function:

```js
replacer = function(emoji, name) {
    // Customise output here
    return emojifiedString;
}

emojify.replace('I am happy :)', replacer);
```

Your callback function will receive two parameters, the emoji pattern found (`emoji`), and the emoji name (`name`). In the case of emoticons, for example, `emoji = ':)'` and `name = 'smile'`.

### Excluding elements from being processed

To exclude tags from being emojified, add `no-emojify` to their `class` attributes.

## Contributing changes

Please read [CONTRIBUTING.md](CONTRIBUTING.md).

[travis]: https://travis-ci.org/hassankhan/emojify.js
[package-bower]: http://bower.io/search/?q=emojify.js
[package-npm]: https://www.npmjs.org/package/emojify.js
[ico-build]: http://img.shields.io/travis/hassankhan/emojify.js.svg?style=flat
[ico-build-dev]: http://img.shields.io/travis/hassankhan/emojify.js/develop.svg?style=flat
[ico-bower]: http://img.shields.io/badge/bower-0.9.4-blue.svg?style=flat
[ico-npm]: http://img.shields.io/npm/v/emojify.js.svg?style=flat
[ico-license]: http://img.shields.io/npm/l/emojify.js.svg?style=flat
[ico-gitter]: https://badges.gitter.im/hassankhan/emojify.js.png
[license]: http://hassankhan.mit-license.org/
[gitter]: https://gitter.im/hassankhan/emojify.js
