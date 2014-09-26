#emojify.js v0.9.4

[![NPM version][ico-npm]][package-npm]
[![Bower version][ico-bower]][package-bower]
[![MIT Licensed][ico-license]][license]
[![Gitter chat][ico-gitter]][gitter]
---
Master: [![Master branch build status][ico-build]][travis]
Develop: [![Develop branch build status][ico-build]][travis]
[![Browser Results](https://ci.testling.com/hassankhan/emojify.js.png)](https://ci.testling.com/hassankhan/emojify.js)

A Javascript module to convert emoji keywords to images. Used by [Gitter](https://gitter.im/)

The emoji keywords are as described by [emoji-cheat-sheet.com](http://www.emoji-cheat-sheet.com).

Go to this project's [GitHub pages](http://hassankhan.github.com/emojify.js) to see the module in action.


## Rationale
I wanted [my blog](http://hassankhan.me) to display smileys nicely, decided to use Emojis because they look nice. [GitterHQ](https://github.com/gitterHQ) wanted to use it in [Gitter](https://gitter.im/), so they very kindly rewrote it and here we are.


## Usage
Add the following line to your HTML:

    <script src="emojify.js"></script>

Now type in an emoji keyword in your HTML, for example ``:smile:``
Now run emojify using ``emojify.run()``.
To exclude tags from being emojified, add ``no-emojify`` to their ``class`` attributes.

You can optionally pass an object to ``emojify.run()`` to restrict the **emojification** to that object only: ``emojify.run(document.getElementById('my-element'))``

You can also use ``emojify.replace()`` method to emojify a string directly:

### Configuration
To set configuration options, use `emojify.setConfig()` and a JSON object as a parameter with the following attributes:
* ``emojify_tag_type``: Set to `null` by default. When set, emojify uses this `emojify_tag_type` element with the class `emoji emoji-#{emojiname}` instead of an `img` with a `src` attribute.  Example valid values: `div`, `span`
* ``only_crawl_id``: Set to `null` by default. Restricts searching for emojis to a specified element & it's children. If null, and no object is passed to ``run()``, `document.body` is used.
* ``img_dir`` defines the path to the emoji images.
* ``ignore_emoticons`` Set to `false` by default. If `true`, only convert :emoji: and ignore emoticons like :-) and ;D.
* ``ignored_tags`` should be a list of elements that you don't want emojified.

### Code Example

    emojify.setConfig({
        emojify_tag_type : 'div',           // Only run emojify.js on this element
        only_crawl_id    : null,            // Use to restrict where emojify.js applies
        img_dir          : 'images/emoji',  // Directory for emoji images
        ignore_emoticons : false            // If true, only convert :emoji: and ignore :-)
        ignored_tags     : {                // Ignore the following tags
            'SCRIPT'  : 1,
            'TEXTAREA': 1,
            'A'       : 1,
            'PRE'     : 1,
            'CODE'    : 1
        }
    });
    emojify.run();

## Contributing

See our [CONTRIBUTING.md](CONTRIBUTING.md).

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
