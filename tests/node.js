var jsdom = require('jsdom');

global.JS = require('jstest');
global.emojify = require('../src/emojify.js');

require('./spec/dom');
require('./spec/tag_type');
require('./spec/string');

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
        JS.Test.autorun(function(runner){
            runner.setReporter(new JS.Test.Reporters.Spec())
            runner.addReporter(new JS.Test.Reporters.ExitStatus())
        })
    }
})


