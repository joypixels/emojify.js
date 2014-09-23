JS.Test.describe('emojify with differing tag_types', function() {
    'use strict';

    this.describe('emojify using .replace', function() {
        this.it('should default to img element', function() {
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':smile:\' alt=\':smile:\' class=\'emoji\' src=\'images/emoji/smile.png\' align=\'absmiddle\' />', result);
        });

        this.it('null emojify_tag_type should be img element', function() {
            emojify.setConfig({
                emojify_tag_type: null
            });
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':smile:\' alt=\':smile:\' class=\'emoji\' src=\'images/emoji/smile.png\' align=\'absmiddle\' />', result);
        });

        this.it('img emojify_tag_type should be well formed', function() {
            emojify.setConfig({
                emojify_tag_type: 'img'
            });
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<img title=\':smile:\' alt=\':smile:\' class=\'emoji\' src=\'images/emoji/smile.png\' align=\'absmiddle\' />', result);
        });

        this.it('div emojify_tag_type should be well formed', function() {
            emojify.setConfig({
                emojify_tag_type: 'div'
            });
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<div title=\':smile:\' alt=\':smile:\' class=\'emoji emoji-smile\'> </div>', result);
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
            this.assertEqual('<img class="emoji" src="images/emoji/smile.png" title=":smile:" alt=":smile:" align="absmiddle"></img>', this.el.innerHTML);
        });

        this.it('img emojify_tag_type should be img element', function() {
            emojify.setConfig({
                emojify_tag_type: 'img'
            });
            this.el.innerHTML = ":)";
            emojify.run(this.el);
            this.assertEqual('<img class="emoji" src="images/emoji/smile.png" title=":smile:" alt=":smile:" align="absmiddle"></img>', this.el.innerHTML);
        });

        this.it('div emojify_tag_type should be well formed', function() {
            emojify.setConfig({
                emojify_tag_type: 'div'
            });
            this.el.innerHTML = ":)";
            emojify.run(this.el);
            this.assertEqual('<div class="emoji emoji-smile" title=":smile:" alt=":smile:" align="absmiddle"></div>', this.el.innerHTML);
        });

    });
});
