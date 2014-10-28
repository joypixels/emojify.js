"use strict";

var parser = require('emojify-parser');

var emojify = function(element, options) {
    var document = options.document;

    var nodeToReplace = element.childNodes[0];
    var tokens = parser.parse(nodeToReplace.textContent);

    var newChildren = tokens.map(function(token) {
        if(token.type === 'emoji') {
            var emojiElement = document.createElement('img');
            emojiElement.setAttribute('class', 'emoji');
            emojiElement.setAttribute('src', '/' + token.name + '.png');
            emojiElement.setAttribute('title', token.raw);
            emojiElement.setAttribute('alt', token.raw);
            emojiElement.setAttribute('align', 'absmiddle');

            return emojiElement;
        } else {
            return document.createTextNode(token.raw);
        }
    });

    newChildren.forEach(function(node) {
        element.insertBefore(node, nodeToReplace);
    });

    element.removeChild(nodeToReplace);

    return tokens;
};

module.exports = emojify;
