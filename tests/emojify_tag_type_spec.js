JS.Test.describe('emojify with differing tag_types', function() {
    'use strict';

    this.describe('emojify creation of img elements', function() {
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
    });

    this.describe('emojify creation of user specifed tag type via emojify_tag_type', function() {
        this.it('div emojify_tag_type should be well formed', function() {
            emojify.setConfig({
                emojify_tag_type: 'div'
            });
            var text = ':)';
            var result = emojify.replace(text);
            this.assertEqual('<div title=\':blush:\' alt=\':blush:\' class=\'emoji emoji-blush\'> </div>', result);
        });
    });



});
