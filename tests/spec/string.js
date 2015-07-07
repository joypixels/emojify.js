JS.Test.describe('emojify used with flat strings', function() {
    'use strict';

    this.describe('with variations of spacing around 2char smileys', function() {
        this.it('works with no spacing around :)', function() {
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<img align=\'absmiddle\' alt=\':smile:\' class=\'emoji\' src=\'images/emoji/smile.png\' title=\':smile:\' />', result);
        });

        this.it('works with spacing before :)', function() {
            var text = " :)";
            var result = emojify.replace(text);
            this.assertEqual(' <img align=\'absmiddle\' alt=\':smile:\' class=\'emoji\' src=\'images/emoji/smile.png\' title=\':smile:\' />', result);
        });

        this.it('works with spacing after :)', function() {
            var text = ":) ";
            var result = emojify.replace(text);
            this.assertEqual('<img align=\'absmiddle\' alt=\':smile:\' class=\'emoji\' src=\'images/emoji/smile.png\' title=\':smile:\' /> ', result);
        });

        this.it('works with spacing before and after :)', function() {
            var text = " :) ";
            var result = emojify.replace(text);
            this.assertEqual(' <img align=\'absmiddle\' alt=\':smile:\' class=\'emoji\' src=\'images/emoji/smile.png\' title=\':smile:\' /> ', result);
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
    });

    this.describe('with multiple emoji beside each other', function() {

        this.it('works with multiple :emoji: style', function() {
            var text = ":railway_car::railway_car:";
            var result = emojify.replace(text);
            this.assertEqual('<img align=\'absmiddle\' alt=\':railway_car:\' class=\'emoji\' src=\'images/emoji/railway_car.png\' title=\':railway_car:\' /><img align=\'absmiddle\' alt=\':railway_car:\' class=\'emoji\' src=\'images/emoji/railway_car.png\' title=\':railway_car:\' />', result);
        });

        this.it('works with multiple :) style', function() {
            var text = ":):P";
            var result = emojify.replace(text);
            this.assertEqual('<img align=\'absmiddle\' alt=\':smile:\' class=\'emoji\' src=\'images/emoji/smile.png\' title=\':smile:\' /><img align=\'absmiddle\' alt=\':stuck_out_tongue_winking_eye:\' class=\'emoji\' src=\'images/emoji/stuck_out_tongue_winking_eye.png\' title=\':stuck_out_tongue_winking_eye:\' />', result);
        });
    });

    this.describe('isolated cases', function() {
        this.it(':neckbeard:', function() {
            var text = ":neckbeard:";
            var result = emojify.replace(text);
            this.assertEqual('<img align=\'absmiddle\' alt=\':neckbeard:\' class=\'emoji\' src=\'images/emoji/neckbeard.png\' title=\':neckbeard:\' />', result);
        });

        this.it('inserts a <3 heart', function() {
            var text = "inserts a <3 heart";
            var result = emojify.replace(text);
            this.assertEqual('inserts a <img align=\'absmiddle\' alt=\':heart:\' class=\'emoji\' src=\'images/emoji/heart.png\' title=\':heart:\' /> heart', result);
        });

        this.it('works on an HTML escaped <3', function() {
            var text = "inserts a &lt;3 heart";
            var result = emojify.replace(text);
            this.assertEqual('inserts a <img align=\'absmiddle\' alt=\':heart:\' class=\'emoji\' src=\'images/emoji/heart.png\' title=\':heart:\' /> heart', result);
        });

        this.it("works on :'(", function() {
            var text = "aww :'( aw :’(";
            var result = emojify.replace(text);
            this.assertEqual('aww <img align=\'absmiddle\' alt=\':sob:\' class=\'emoji\' src=\'images/emoji/sob.png\' title=\':sob:\' /> aw <img align=\'absmiddle\' alt=\':sob:\' class=\'emoji\' src=\'images/emoji/sob.png\' title=\':sob:\' />', result);
        });

        this.it("works on HTML escaped :'(", function() {
            var text = "aww :&#x27;( aw";
            var result = emojify.replace(text);
            this.assertEqual('aww <img align=\'absmiddle\' alt=\':sob:\' class=\'emoji\' src=\'images/emoji/sob.png\' title=\':sob:\' /> aw', result);
        });

        this.it("I thought it'd run forever", function() {
            var text = "I thought it'd run forever";
            var result = emojify.replace(text);
            this.assertEqual(text, result);
        });

        this.it(":) start of string with space emojifies", function() {
            var text = ":) start of string with space";
            var result = emojify.replace(text);
            this.assertEqual('<img align=\'absmiddle\' alt=\':smile:\' class=\'emoji\' src=\'images/emoji/smile.png\' title=\':smile:\' /> start of string with space', result);
        });

        this.it("end of string with space :) emojifies", function() {
            var text = "end of string with space :)";
            var result = emojify.replace(text);
            this.assertEqual('end of string with space <img align=\'absmiddle\' alt=\':smile:\' class=\'emoji\' src=\'images/emoji/smile.png\' title=\':smile:\' />', result);
        });

        this.it("doesn't emojify words ending in `'d`", function () {
            var text = "I&#x27;d better not see emoji in this string; that'd suck";
            var result = emojify.replace(text);
            this.assertEqual("I&#x27;d better not see emoji in this string; that'd suck", result);
        });

        this.it("interprets :o and :O", function () {
            var text = ":o :O";
            var result = emojify.replace(text);
            this.assertEqual("<img align=\'absmiddle\' alt=\':open_mouth:\' class=\'emoji\' src=\'images/emoji/open_mouth.png\' title=\':open_mouth:\' /> <img align=\'absmiddle\' alt=\':open_mouth:\' class=\'emoji\' src=\'images/emoji/open_mouth.png\' title=\':open_mouth:\' />", result);
        });

    });

    this.describe('with ignore_emoticons option enabled', function () {
        this.it('only works on emoji, not emoticons', function () {
            emojify.setConfig({ ignore_emoticons: true });
            var text = ':) :+1: :P :musical_note:';
            var result = emojify.replace(text);
            emojify.setConfig({ ignore_emoticons: false });
            this.assertEqual(':) <img align=\'absmiddle\' alt=\':thumbsup:\' class=\'emoji\' src=\'images/emoji/thumbsup.png\' title=\':thumbsup:\' /> :P <img align=\'absmiddle\' alt=\':musical_note:\' class=\'emoji\' src=\'images/emoji/musical_note.png\' title=\':musical_note:\' />', result);
        });
    });

});
