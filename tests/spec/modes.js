JS.Test.describe('emojify in different modes', function() {
    'use strict';

    this.before(function() {
        this.el = document.createElement("DIV");
    });

    this.describe('emojify without a specified mode', function() {
        this.it('should default to img mode', function() {
            var text = ':)';
            this.el.innerHTML = text;
            emojify.run(this.el);
            this.assertEqual('img', this.el.children[0].tagName.toLowerCase());
        });
    });

    this.describe('emojify in sprite mode', function() {
        this.describe('using .run', function() {
            this.it( 'should generate spans with classes', function () {
                var text = ':)';
                this.el.innerHTML = text;
                emojify.setConfig({
                    mode: 'sprite'
                });
                 emojify.run( this.el );
                var child = this.el.children[0];
                this.assertEqual( 'span', child.tagName.toLowerCase() );
                this.assertEqual( 'emoji emoji-smile', child.className );
                this.assertEqual( ':smile:', child.title );
            } );

            this.it( 'should still accept a custom renderer', function () {
                var text = ':)';
                this.el.innerHTML = text;
                emojify.setConfig({
                    mode: 'sprite'
                });
                emojify.run( this.el, function ( emoji, emojiName ) {
                    var paragraph = document.createElement( 'p' );
                    paragraph.innerHTML = emoji + ' found (' + emojiName + ')';
                    return paragraph;
                } );
                this.assertEqual( '<p>:smile: found (smile)</p>', this.el.innerHTML );
            } );

            this.it( 'should still accept a custom tag type', function () {
                var text = ':)';
                this.el.innerHTML = text;
                emojify.setConfig({
                    tag_type: 'blah',
                    mode: 'sprite'
                });
                emojify.run( this.el );
                this.assertEqual( 'blah', this.el.children[0].tagName.toLowerCase() );
            } );
        });

        this.describe('using .replace', function() {
            this.it('should generate spans', function() {
                var text = ':)';

                emojify.setConfig({
                    tag_type: null,
                    mode: 'sprite'
                });
                var result = emojify.replace(text);
                this.assertEqual('<span class=\'emoji emoji-smile\' title=\':smile:\'></span>', result);
            });

            this.it('should still accept a custom renderer', function() {
                var text = ':)';
                emojify.setConfig({
                    mode: 'sprite'
                });
                var result = emojify.replace(text, function(emoji, emojiName){
                    return '<blah> ' + emoji + ' found (' + emojiName + ')</blah>';
                });
                this.assertEqual('<blah> :) found (smile)</blah>', result);
            });

            this.it('should still accept a custom tag type', function() {
                var text = ':)';
                emojify.setConfig({
                    tag_type: 'blah',
                    mode: 'sprite'
                });
                var result = emojify.replace(text);
                this.assertEqual('<blah class=\'emoji emoji-smile\' title=\':smile:\'></blah>', result);
            });
        });
    });

    this.describe('emojify in data-URI mode', function() {
        this.describe('using .run', function() {
            this.it( 'should generate spans with classes', function () {
                var text = ':)';
                this.el.innerHTML = text;
                emojify.setConfig({
                    tag_type: null,
                    mode: 'data-uri'
                });
                emojify.run( this.el );
                var child = this.el.children[0];
                this.assertEqual( 'span', child.tagName.toLowerCase() );
                this.assertEqual( 'emoji emoji-smile', child.className );
                this.assertEqual( ':smile:', child.title );
            } );

            this.it( 'should still accept a custom renderer', function () {
                var text = ':)';
                this.el.innerHTML = text;
                emojify.setConfig({
                    mode: 'data-uri'
                });
                emojify.run( this.el, function ( emoji, emojiName ) {
                    var paragraph = document.createElement( 'p' );
                    paragraph.innerHTML = emoji + ' found (' + emojiName + ')';
                    return paragraph;
                } );
                this.assertEqual( '<p>:smile: found (smile)</p>', this.el.innerHTML );
            } );

            this.it( 'should still accept a custom tag type', function () {
                var text = ':)';
                this.el.innerHTML = text;
                emojify.setConfig({
                    tag_type: 'blah',
                    mode: 'data-uri'
                });
                emojify.run( this.el );
                this.assertEqual( 'blah', this.el.children[0].tagName.toLowerCase() );
            } );
        });

        this.describe('using .replace', function() {
            this.it('should generate spans', function() {
                var text = ':)';

                emojify.setConfig({
                    tag_type: null,
                    mode: 'data-uri'
                });
                var result = emojify.replace(text);
                this.assertEqual('<span class=\'emoji emoji-smile\' title=\':smile:\'></span>', result);
            });

            this.it('should still accept a custom renderer', function() {
                var text = ':)';

                emojify.setConfig({
                    mode: 'data-uri'
                });
                var result = emojify.replace(text, function(emoji, emojiName){
                    return '<blah> ' + emoji + ' found (' + emojiName + ')</blah>';
                });
                this.assertEqual('<blah> :) found (smile)</blah>', result);
            });

            this.it('should still accept a custom tag type', function() {
                var text = ':)';
                emojify.setConfig({
                    tag_type: 'blah',
                    mode: 'data-uri'
                });
                var result = emojify.replace(text);
                this.assertEqual('<blah class=\'emoji emoji-smile\' title=\':smile:\'></blah>', result);
            });
        });
    });
});
