/* jshint unused:true, browser:true,  strict:true */
/* global JS:false, emojify:false */

JS.Test.describe('emojify on DOM nodes', function() {
    'use strict';

    this.before(function() {
        this.el = document.createElement("DIV");
    });

    this.describe('with variations of spacing around 2char smileys', function() {
        this.it('works with no spacing around :)', function() {
            var result;
            this.el.innerHTML = ":)";
            result = emojify.run(this.el);
            this.assertEqual('<img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img>', this.el.innerHTML);
        });

        this.it('works with spacing before :)', function() {
            var result;
            this.el.innerHTML = " :)";
            result = emojify.run(this.el);
            this.assertEqual(' <img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img>', this.el.innerHTML);
        });

        this.it('works with spacing after :)', function() {
            var result;
            this.el.innerHTML = ":) ";
            result = emojify.run(this.el);
            this.assertEqual('<img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img> ', this.el.innerHTML);
        });

        this.it('works with spacing before and after :)', function() {
            var result;
            this.el.innerHTML = " :) ";
            result = emojify.run(this.el);
            this.assertEqual(' <img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img> ', this.el.innerHTML);
        });
    });

    this.describe('with multiple emoji beside each other', function() {
        this.it('works with multiple :emoji: style', function() {
            this.el.innerHTML = ":railway_car::railway_car:";
            emojify.run(this.el);
            this.assertEqual('<img title=":railway_car:" class="emoji" src="images/emoji/railway_car.png" align="absmiddle"></img><img title=":railway_car:" class="emoji" src="images/emoji/railway_car.png" align="absmiddle"></img>', this.el.innerHTML);
        });
    });

    this.describe('isolated cases', function() {
        this.it("it'd", function() {
            this.el.innerHTML = "it'd";
            emojify.run(this.el);
            this.assertEqual("it'd", this.el.innerHTML);
        });

        this.it('end of string with space :) emojifies', function() {
            this.el.innerHTML = "end of string with space :)";
            emojify.run(this.el);
            this.assertEqual('end of string with space <img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img>', this.el.innerHTML);
        });

        this.it(':) start of string with space emojifies', function() {
            this.el.innerHTML = ":) start of string with space";
            emojify.run(this.el);
            this.assertEqual('<img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img> start of string with space', this.el.innerHTML);
        });

        this.it(':)', function() {
            this.el.innerHTML = ":)";
            emojify.run(this.el);
            this.assertEqual('<img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img>', this.el.innerHTML);
        });

        this.it(':D', function() {
            this.el.innerHTML = ":D";
            emojify.run(this.el);
            this.assertEqual('<img title=":smiley:" class="emoji" src="images/emoji/smiley.png" align="absmiddle"></img>', this.el.innerHTML);
        });

        this.it(':P', function() {
            this.el.innerHTML = ":P";
            emojify.run(this.el);
            this.assertEqual('<img title=":stuck_out_tongue_winking_eye:" class="emoji" src="images/emoji/stuck_out_tongue_winking_eye.png" align="absmiddle"></img>', this.el.innerHTML);
        });

        this.it('>:P', function() {
            this.el.innerHTML = ">:P";
            emojify.run(this.el);
            this.assertEqual('&gt;<img title=":stuck_out_tongue_winking_eye:" class="emoji" src="images/emoji/stuck_out_tongue_winking_eye.png" align="absmiddle"></img>', this.el.innerHTML);
        });

        this.it('works with many emojis', function() {
            var result;
            this.el.innerHTML = ":):):)";
            result = emojify.run(this.el);
            this.assertEqual('<img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img><img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img><img title=":blush:" class="emoji" src="images/emoji/blush.png" align="absmiddle"></img>', this.el.innerHTML);
        });

    });
});
