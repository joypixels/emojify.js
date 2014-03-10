emojify.js v0.9.1 [![Build Status](https://travis-ci.org/hassankhan/emojify.js.png)](https://travis-ci.org/hassankhan/emojify.js) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/hassankhan/emojify.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge") [![Gitter chat](https://badges.gitter.im/hassankhan/emojify.js.png)](https://gitter.im/hassankhan/emojify.js)
==========

[![Browser Results](https://ci.testling.com/hassankhan/emojify.js.png)](https://ci.testling.com/hassankhan/emojify.js)

<a href="http://bower.io/search/?q=emojify.js"><img src="http://benschwarz.github.io/bower-badges/badge@2x.png" width="130" height="30"></a>

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

### Configuration
To set configuration options, use `emojify.setConfig()` and a JSON object as a parameter with the following attributes:
* ``emojify_tag_type``: Set to `<div>` by default. Sets the element the emojify.js uses to replace emoji keywords
* ``emoticons_enabled``: Set to `true` by default. Enables detection of emoticon keywords.
* ``people_enabled``: Set to `false` by default. Enables detection of emoji people keywords.
* ``nature_enabled``: Set to `false` by default. Enables detection of emoji nature keywords.
* ``objects_enabled``: Set to `false` by default. Enables detection of emoji objects keywords.
* ``places_enabled``: Set to `false` by default. Enables detection of emoji places keywords.
* ``symbols_enabled``: Set to `false` by default. Enables detection of emoji symbols keywords.
* ``only_crawl_id``: Set to `null` by default. Restricts searching for emojis to a specified element & it's children.  If null, and no object is passed to run(), `document.body` is used.

### Code Example

    emojify.setConfig({

        emojify_tag_type : 'div',           // Only run emojify.js on this element
        only_crawl_id    : null,            // Use to restrict where emojify.js applies
        img_dir          : 'images/emoji',  // Directory for emoji images
        ignored_tags     : {                // Ignore the following tags
            'SCRIPT'  : 1,
            'TEXTAREA': 1,
            'A'       : 1,
            'PRE'     : 1,
            'CODE'    : 1
        }
    });
    emojify.run();

## Updating the emoji
From time to time, the emoji at [emoji-cheat-sheet.com](http://www.emoji-cheat-sheet.com) will be updated. Running the
`update.sh` script will update the project with the latest emoji. Don't forget to run grunt after running the update script.

## License
Copyright 2014 Hassan Khan

Licensed under the MIT License
