var emojify = require('../lib/emojify');
var jsdom = require('jsdom');
var assert = require('assert');

describe('emojify', function() {
    it('emojifies an element', function(done) {
        jsdom.env('<span id="cat">hello :cat:</span>', function(err, window) {
            if(err) return done(err);

            var el = window.document.getElementById('cat');

            emojify(el);

            assert.equal(el.outerHTML, '<span id="cat">hello <img class="emoji" src="/cat.png" title=":cat:" alt=":cat:"></span>');
            done();
        });
    });
});
