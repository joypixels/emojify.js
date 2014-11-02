var chai = require('chai'),
    jsdom = require('jsdom'),
    expect = chai.expect,
    assert = chai.assert,
    emojify;

describe('emojify in a Node environment', function(){

    beforeEach(function(){
        emojify = require('../../src/emojify.js');
    });

    describe('.replace', function(){
        it('should replace named emoji', function() {
            var result = emojify.replace(':smile:');
            expect(result).to.equal("<img title=':smile:' alt=':smile:' class='emoji' src='images/emoji/smile.png' align='absmiddle' />");
        });

        it('should replace two-character emoji', function(){
            var result = emojify.replace(':)');
            expect(result).to.equal("<img title=':smile:' alt=':smile:' class='emoji' src='images/emoji/smile.png' align='absmiddle' />");
        });

        it('config should exist as a property of this', function(){
            var replacer = function (emoji, name) {
                assert.property(this, 'config');
            };
            emojify.replace(':)', replacer);
        });

        it('using jsdom should work too!', function(done){
            jsdom.env({
                html: "<p><code>jhhh</code><em>:)</em></p>",
                done: function(errors, window) {
                    emojify.run(window.document.body, window)
                    expect(window.document.body.innerHTML).to.equal("<p><code>jhhh</code><em><img class=\"emoji\" src=\"images/emoji/smile.png\" title=\":smile:\" alt=\":smile:\" align=\"absmiddle\"></em></p>");
                    done()
                }
            });
        });
    });
});
