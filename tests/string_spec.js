JS.Test.describe('emojify used with flat strings', function() {
    'use strict';

    this.describe('with variations of spacing around 2char smileys', function() {
        this.it('works with no spacing around :)', function() {
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':blush:\' alt=\':blush:\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' />', result);
        });

        this.it('works with spacing before :)', function() {
            var text = " :)";
            var result = emojify.replace(text);
            this.assertEqual(' <img title=\':blush:\' alt=\':blush:\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' />', result);
        });

        this.it('works with spacing after :)', function() {
            var text = ":) ";
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':blush:\' alt=\':blush:\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' /> ', result);
        });

        this.it('works with spacing before and after :)', function() {
            var text = " :) ";
            var result = emojify.replace(text);
            this.assertEqual(' <img title=\':blush:\' alt=\':blush:\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' /> ', result);
        });

        this.it('does not insert emoji into the middle of words', function () {
            var text = "a link for you https://hacks.mozilla.org/2014/06/introducing-the-web-audio-editor-in-firefox-developer-tools/"; // `x-d` appears and might be matched in this string
            var result = emojify.replace(text);
            this.assertEqual(text, result);
        });

        this.it('does not insert emoji at the end of a word, unless it is at the end', function () {
            var text = "hey:)";
            var result = emojify.replace(text);
            this.assert(text !== result);

            text = "hey:) there";
            result = emojify.replace(text);
            this.assertEqual(text, result);
        });

        this.it('does not insert emoji at the end of a word, no exception if sloppy emoji parsing at line ends is disabled', function () {
            emojify.setConfig({sloppier_emoticons_at_line_end: false});

            var text = "hey:)";
            var result = emojify.replace(text)
            this.assertEqual(text, result)

            // OK, if it's really only the emoticon we don't object
            text = ":)"
            result = emojify.replace(text)
            this.assert(text !== result);

            emojify.setConfig({sloppier_emoticons_at_line_end: true});
        });
    });

    this.describe('with multiple emoji beside each other', function() {

        this.it('works with multiple :emoji: style', function() {
            var text = ":railway_car::railway_car:";
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':railway_car:\' alt=\':railway_car:\' class=\'emoji\' src=\'images/emoji/railway_car.png\' align=\'absmiddle\' /><img title=\':railway_car:\' alt=\':railway_car:\' class=\'emoji\' src=\'images/emoji/railway_car.png\' align=\'absmiddle\' />', result);
        });

        this.it('works with multiple :) style', function() {
            var text = ":):P";
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':blush:\' alt=\':blush:\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' /><img title=\':stuck_out_tongue_winking_eye:\' alt=\':stuck_out_tongue_winking_eye:\' class=\'emoji\' src=\'images/emoji/stuck_out_tongue_winking_eye.png\' align=\'absmiddle\' />', result);
        });
    });

    this.describe('isolated cases', function() {
        this.it(':neckbeard:', function() {
            var text = ":neckbeard:";
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':neckbeard:\' alt=\':neckbeard:\' class=\'emoji\' src=\'images/emoji/neckbeard.png\' align=\'absmiddle\' />', result);
        });

        this.it('inserts a <3 heart', function() {
            var text = "inserts a <3 heart";
            var result = emojify.replace(text);
            this.assertEqual('inserts a <img title=\':heart:\' alt=\':heart:\' class=\'emoji\' src=\'images/emoji/heart.png\' align=\'absmiddle\' /> heart', result);
        });

        this.it('works on an HTML escaped <3', function() {
            var text = "inserts a &lt;3 heart";
            var result = emojify.replace(text);
            this.assertEqual('inserts a <img title=\':heart:\' alt=\':heart:\' class=\'emoji\' src=\'images/emoji/heart.png\' align=\'absmiddle\' /> heart', result);
        });

        this.it("works on :'(", function() {
            var text = "aww :'( aw :’(";
            var result = emojify.replace(text);
            this.assertEqual('aww <img title=\':sob:\' alt=\':sob:\' class=\'emoji\' src=\'images/emoji/sob.png\' align=\'absmiddle\' /> aw <img title=\':sob:\' alt=\':sob:\' class=\'emoji\' src=\'images/emoji/sob.png\' align=\'absmiddle\' />', result);
        });

        this.it("works on HTML escaped :'(", function() {
            var text = "aww :&#x27;( aw";
            var result = emojify.replace(text);
            this.assertEqual('aww <img title=\':sob:\' alt=\':sob:\' class=\'emoji\' src=\'images/emoji/sob.png\' align=\'absmiddle\' /> aw', result);
        });

        this.it("I thought it'd run forever", function() {
            var text = "I thought it'd run forever";
            var result = emojify.replace(text);
            this.assertEqual(text, result);
        });

        this.it(":) start of string with space emojifies", function() {
            var text = ":) start of string with space";
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':blush:\' alt=\':blush:\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' /> start of string with space', result);
        });

        this.it("end of string with space :) emojifies", function() {
            var text = "end of string with space :)";
            var result = emojify.replace(text);
            this.assertEqual('end of string with space <img title=\':blush:\' alt=\':blush:\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' />', result);
        });

        this.it("doesn't emojify words ending in `'d`", function () {
            var text = "I&#x27;d better not see emoji in this string; that'd suck";
            var result = emojify.replace(text);
            this.assertEqual("I&#x27;d better not see emoji in this string; that'd suck", result);
        });

    });
});
