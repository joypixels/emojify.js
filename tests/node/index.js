var chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    emojify;

describe('emojify in a Node environment', function(){

    beforeEach(function(){
        emojify = require('../../');
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
    });
});
