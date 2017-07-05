JS.Test.describe('emojify with differing tag_types', function() {
    'use strict';

    this.describe('emojify using .replace', function() {
        this.it('should default to img element', function() {
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<img align=\'absmiddle\' alt=\':grinning:\' class=\'emoji\' src=\'images/emoji/grinning.png\' title=\':grinning:\' />', result);
        });

        this.it('null tag_type should be img element', function() {
            emojify.setConfig({
                tag_type: null
            });
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<img align=\'absmiddle\' alt=\':grinning:\' class=\'emoji\' src=\'images/emoji/grinning.png\' title=\':grinning:\' />', result);
        });

        this.it('img tag_type should be well formed', function() {
            emojify.setConfig({
                tag_type: 'img'
            });
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<img align=\'absmiddle\' alt=\':grinning:\' class=\'emoji\' src=\'images/emoji/grinning.png\' title=\':grinning:\' />', result);
        });

        this.it('div tag_type should be well formed', function() {
            emojify.setConfig({
                tag_type: 'div'
            });
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<div class=\'emoji emoji-grinning\' title=\':grinning:\'></div>', result);
        });
    });

    this.describe('emojify using .run', function() {

        this.before(function() {
            this.el = document.createElement("DIV");
        });

        this.it('null tag_type should be img element', function() {
            emojify.setConfig({
                tag_type: null
            });
            this.el.innerHTML = ":)";
            emojify.run(this.el);

            this.assertEqual( 'img', this.el.children[0].tagName.toLowerCase() );
        });

        this.it('img tag_type should be img element', function() {
            emojify.setConfig({
                tag_type: 'img'
            });
            this.el.innerHTML = ":)";
            emojify.run(this.el);
            this.assertEqual( 'img', this.el.children[0].tagName.toLowerCase() );
        });

        this.it('div tag_type should be well formed', function() {
            emojify.setConfig({
                tag_type: 'div'
            });
            this.el.innerHTML = ":)";
            emojify.run(this.el);
            var child = this.el.children[0];
            this.assertEqual( 'div', child.tagName.toLowerCase() );
            this.assertEqual( 'emoji emoji-grinning', child.className );
            this.assertEqual( ':grinning:', child.title );
        });

    });
});
