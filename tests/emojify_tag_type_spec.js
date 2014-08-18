JS.Test.describe('emojify with differing tag_types', function() {
    'use strict';

    this.describe('emojify using .replace', function() {
        this.it('should default to img element', function() {
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':blush:\' alt=\':blush:\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' />', result);
        });

        this.it('null emojify_tag_type should be img element', function() {
            emojify.setConfig({
                emojify_tag_type: null
            });
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':blush:\' alt=\':blush:\' class=\'emoji\' src=\'images/emoji/blush.png\' align=\'absmiddle\' />', result);
        });

        this.it('div emojify_tag_type should be well formed', function() {
            emojify.setConfig({
                emojify_tag_type: 'div'
            });
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<div title=\':blush:\' alt=\':blush:\' class=\'emoji emoji-blush\'> </div>', result);
        });
    });

    this.describe('emojify using .run', function() {

        this.before(function() {
            this.el = document.createElement("DIV");
        });

        this.it('null emojify_tag_type should be img element', function() {
            emojify.setConfig({
                emojify_tag_type: null
            });
            this.el.innerHTML = ":)";
            emojify.run(this.el);
            this.assertEqual('<img class="emoji" src="images/emoji/blush.png" title=":blush:" alt=":blush:" align="absmiddle"></img>', this.el.innerHTML);
        });

        this.it('div emojify_tag_type should be well formed', function() {
            emojify.setConfig({
                emojify_tag_type: 'div'
            });
            this.el.innerHTML = ":)";
            emojify.run(this.el);
            this.assertEqual('<div class="emoji emoji-blush" title=":blush:" alt=":blush:" align="absmiddle"></div>', this.el.innerHTML);
        });

    });
});
