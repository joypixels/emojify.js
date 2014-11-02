var jsdom = require('jsdom');

global.JS = require('jstest');
global.emojify = require('../');

require('./browser/dom_spec');
require('./browser/emojify_tag_type_spec');
require('./browser/string_spec');

global.assertEmoji = function (test, rootEl, emojiTitles) {
    var emojis = rootEl.querySelectorAll('.emoji');
    test.assertEqual(emojiTitles.length, emojis.length);
    for(var i = 0; i < emojis.length; i++) {
        test.assertEqual(emojiTitles[i], emojis[i].title);
    }
};

jsdom.env({
    html: '<html><body></body></html>',
    done: function(errors, win) {
        global.window = win;
        global.document = win.document;
        JS.Test.autorun()
    }
})


