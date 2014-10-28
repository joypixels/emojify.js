# emojify.js

[![npm version][ico-npm]][package-npm]
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

### Via cdnjs **[SOON]**

Add this to the rest of your stylesheet imports:
Then add this to your Javascript code:

### Via Bower

`bower install emojify.js --save`

### Via npm

`npm install emojify.js  --save`

## API

### setConfig([object])

*This works in the browser and on Node*

#### Parameters
- `object` - Optional JSON object with any of the following attributes:

Option | Default | Description
--- | --- | ---
`emojify_tag_type` | `null` | When set, emojify uses this element with the class `emoji emoji-#{emojiname}` instead of an `img` with a `src` attribute.  Example valid values: `div`, `span`
`only_crawl_id` | `null` | Restricts searching for emojis to a specified element & it's children. If null, and no object is passed to `run()`, `document.body` is used
`img_dir` | `'images/emoji'` | Defines the path to the emoji images
`ignore_emoticons` | `false` | If `true`, only convert emoji like `:smile:` and ignore emoticons like `:)`
`ignored_tags` | `{'SCRIPT': 1,'TEXTAREA': 1,'A': 1,'PRE': 1,'CODE': 1}` | A list of elements that you don't want emojified

#### Usage
```js
emojify.setConfig({emojify_tag_type : 'div'});
```

---

### run([element])

*This only works in the browser*

#### Parameters
- `element` - Optional HTML element to restrict the emojification to.

#### Usage
```js
emojify.run();
// OR
emojify.run(document.getElementById('my-element'))
```

---

### replace(string, [callback])

*This works in the browser and on Node*

#### Parameters
- `string` - String to emojify
- `callback` - Optional callback function to output emoji with

#### Usage

By default, emojify.js uses the internal function `defaultReplacer()` to replace emoji. You can override this behaviour by supplying your own callback function.

Your callback function will receive two parameters, the emoji pattern found (`emoji`), and the emoji name (`name`). In the case of emoticons, for example, `emoji = ':)'` and `name = 'smile'`.

The context in which your replacer function is run will have the config available. So you can access properties such as `img_dir` at `this.config.img_dir`.

```js
emojify.replace('I am happy :)');
// OR
replacer = function(emoji, name) {
    // Customise output here
    return emojifiedString;
}

emojify.replace('I am happy :)', replacer);
```

### Excluding elements from being processed

To exclude tags from being emojified, add `no-emojify` to their `class` attributes.

## Contributing changes

Please read [CONTRIBUTING.md](CONTRIBUTING.md).

[travis]: https://travis-ci.org/hassankhan/emojify.js
[package-bower]: http://bower.io/search/?q=emojify.js
[package-npm]: https://www.npmjs.org/package/emojify.js
[ico-build]: http://img.shields.io/travis/hassankhan/emojify.js.svg?style=flat-square
[ico-build-dev]: http://img.shields.io/travis/hassankhan/emojify.js/develop.svg?style=flat-square
[ico-bower]: http://img.shields.io/badge/bower-0.9.4-blue.svg?style=flat-square
[ico-npm]: http://img.shields.io/npm/v/emojify.js.svg?style=flat-square
[ico-license]: http://img.shields.io/npm/l/emojify.js.svg?style=flat-square
[ico-gitter]: https://badges.gitter.im/hassankhan/emojify.js.png
[license]: http://hassankhan.mit-license.org/
[gitter]: https://gitter.im/hassankhan/emojify.js
