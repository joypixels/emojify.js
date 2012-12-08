emojify.js
==========

A Javascript module to convert emoji keywords to images.

The emoji keywords are as described by [emoji-cheat-sheet.com](http://www.emoji-cheat-sheet.com).

## Rationale
I wanted [my blog](http://hassankhan.me) to display smileys nicely, decided to use Emojis because they look nice.


## Usage
Add the required lines to the ``<head>`` part of your HTML code:

    <link rel="stylesheet" type="text/css" href="emojify.css">
    <script src="emojify.js"></script>

Now type in an emoji keyword in your HTML, for example ``:smile:``
Now run emojify using ``emojify.run()``.


## Dependencies
This module depends on LESS, or at least requires you to compile the LESS source to CSS.


## License
Copyright 2012 Hassan Khan

Licensed under the MIT License