emojify.js v0.7.1
==========

A Javascript module to convert emoji keywords to images.

The emoji keywords are as described by [emoji-cheat-sheet.com](http://www.emoji-cheat-sheet.com).

Go to this project's [GitHub pages](http://hassankhan.github.com/emojify.js) to see this module in action.


## Rationale
I wanted [my blog](http://hassankhan.me) to display smileys nicely, decided to use Emojis because they look nice.


## Usage
Add the required lines to the ``<head>`` part of your HTML code:

    <link rel="stylesheet" type="text/css" href="emojify.css">
    <script src="emojify.js"></script>

Now type in an emoji keyword in your HTML, for example ``:smile:``
Now run emojify using ``emojify.run()``.
To exclude tags from being emojified, add ``no-emojify`` to their ``class`` attributes.

### Configuration
To set configuration options, use `emojify.setConfig()` and a JSON object as a parameter with the following attributes:
* ``emojify_tag_type``: Set to `<div>` by default. Sets the element the emojify.js uses to replace emoji keywords
* ``emoticons_enabled``: Set to `true` by default. Enables detection of emoticon keywords.
* ``people_enabled``: Set to `false` by default. Enables detection of emoji people keywords.
* ``nature_enabled``: Set to `false` by default. Enables detection of emoji nature keywords.
* ``objects_enabled``: Set to `false` by default. Enables detection of emoji objects keywords.
* ``places_enabled``: Set to `false` by default. Enables detection of emoji places keywords.
* ``symbols_enabled``: Set to `false` by default. Enables detection of emoji symbols keywords.
* ``only_crawl_id``: Set to `null` by default. Restricts searching for emojis to a specified element & it's children.  If null, `document.body` is used.

### Code Example

    emojify.setConfig({
        emojify_tag_type: 'img',
        emoticons_enabled: true,
        people_enabled: true,
        nature_enabled: true,
        objects_enabled: true,
        places_enabled: true,
        symbols_enabled: true,
        only_crawl_id: 'messages_container'  #only do this when you want to restrict where emojify looks.
    });
    emojify.run();

## Dependencies
This module depends on LESS, or at least requires you to compile the LESS source to CSS.


## License
Copyright 2012 Hassan Khan

Licensed under the MIT License
