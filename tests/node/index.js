var chai = require('chai'),
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
            expect(result).to.equal("<img align='absmiddle' alt=':smile:' class='emoji' src='images/emoji/smile.png' title=':smile:' />");
        });

        it('should replace two-character emoji', function(){
            var result = emojify.replace(':)');
            expect(result).to.equal("<img align='absmiddle' alt=':smile:' class='emoji' src='images/emoji/smile.png' title=':smile:' />");
        });

        it('config should exist as a property of this', function(){
            var replacer = function (emoji, name) {
                assert.property(this, 'config');
            };
            emojify.replace(':)', replacer);
        });
    });
});
