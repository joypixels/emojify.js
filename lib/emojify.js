"use strict";

var parser = require('emojify-parser');

var createHTML = function(token) {
    if(token.type === 'emoji') {
        return '<img class="emoji" src="/'+token.name+'.png" title="'+token.raw+'" alt="'+token.raw+'">';
    } else {
        return token.raw;
    }
};

var emojify = function(element) {

    var nodeToReplace = element.childNodes[0];
    var tokens = parser.parse(nodeToReplace.textContent);

    var html = tokens.reduce(function(html, token) {
        return html + createHTML(token);
    }, '');
    element.innerHTML = html;
};

module.exports = emojify;
