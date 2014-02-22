/* jshint unused:true, browser:true,  strict:true */
/* global JS:false, emojify:false */


function assertEmoji(test, rootEl, emojiTitles) {
    var emojis = rootEl.querySelectorAll('.emoji');
    test.assertEqual(emojiTitles.length, emojis.length);
    for(var i = 0; i < emojis.length; i++) {
        test.assertEqual(emojiTitles[i], emojis[i].title);
    }
}

JS.Test.describe('emojify on DOM nodes', function() {
    'use strict';

    this.before(function() {
        this.el = document.createElement("DIV");
    });

    this.describe('with variations of spacing around 2char smileys', function() {
        this.it('works with no spacing around :)', function() {
            this.el.innerHTML = ":)";
            emojify.run(this.el);
            assertEmoji(this, this.el, [':blush:']);
        });

        this.it('works with spacing before :)', function() {
            this.el.innerHTML = " :)";
            emojify.run(this.el);
            assertEmoji(this, this.el, [':blush:']);
        });

        this.it('works with spacing after :)', function() {
            this.el.innerHTML = ":) ";
            emojify.run(this.el);
            assertEmoji(this, this.el, [':blush:']);
        });

        this.it('works with spacing before and after :)', function() {
            this.el.innerHTML = " :) ";
            emojify.run(this.el);
            assertEmoji(this, this.el, [':blush:']);
        });
    });

    this.describe('with multiple emoji beside each other', function() {
        this.it('works with multiple :emoji: style', function() {
            this.el.innerHTML = ":railway_car::railway_car:";
            emojify.run(this.el);
            assertEmoji(this, this.el, [':railway_car:',':railway_car:']);
        });
    });

    this.describe('isolated cases', function() {
        this.it("it'd", function() {
            this.el.innerHTML = "it'd";
            emojify.run(this.el);
            this.assertEqual("it'd", this.el.innerHTML);
            assertEmoji(this, this.el, []);
        });

        this.it('end of string with space :) emojifies', function() {
            this.el.innerHTML = "end of string with space :)";
            emojify.run(this.el);
            assertEmoji(this, this.el, [':blush:']);
        });

        this.it(':) start of string with space emojifies', function() {
            this.el.innerHTML = ":) start of string with space";
            emojify.run(this.el);
            assertEmoji(this, this.el, [':blush:']);
        });

        this.it(':)', function() {
            this.el.innerHTML = ":)";
            emojify.run(this.el);
            var emojis = this.el.querySelectorAll('.emoji');
            this.assertEqual(1, emojis.length);
            this.assertEqual(':blush:', emojis[0].title);
        });

        this.it(':D', function() {
            this.el.innerHTML = ":D";
            emojify.run(this.el);
            assertEmoji(this, this.el, [':smiley:']);
        });

        this.it(':P', function() {
            this.el.innerHTML = ":P";
            emojify.run(this.el);
            assertEmoji(this, this.el, [':stuck_out_tongue_winking_eye:']);
        });

        this.it('>:P', function() {
            this.el.innerHTML = ">:P";
            emojify.run(this.el);
            assertEmoji(this, this.el, [':stuck_out_tongue_winking_eye:']);
        });

        this.it('works with many emojis', function() {
            var result;
            this.el.innerHTML = ":):):)";
            result = emojify.run(this.el);
            assertEmoji(this, this.el, [':blush:',':blush:',':blush:']);
        });

    });

    this.describe('ignore cases', function() {

        this.it('dont emojifiy inside pre tags', function() {
            var result;
            this.el.innerHTML = "<pre>:)</pre>";
            result = emojify.run(this.el);
            assertEmoji(this, this.el, []);
        });

        this.it('dont emojifiy inside code tags', function() {
            var result;
            this.el.innerHTML = "<code>:)</code>";
            result = emojify.run(this.el);
            assertEmoji(this, this.el, []);
        });
    });
});
