var should = require('should');
var path   = require('path');
var root   = path.normalize(__dirname + '/../../../lib');
var Maat   = require(root + '/maat');
var mt     = null;


describe('Maat defining custom rules', function() {

    beforeEach(function() {
        mt = new Maat();
    });

    processMaatDefiningCustomRules();
});

function processMaatDefiningCustomRules() {

    describe('defineRule', function() {

        it('should throw an error when called without parameters',
                function() {

            (function() {

                mt.defineRule();
            }).should.throwError(/invalid/i);
        });

        it('should throw an error when called without a function', function() {

            (function() {

                mt.defineRule('whoop', null);
            }).should.throwError(/function/i);
        });

        it('should throw an error when called without a valid rule name',
                function() {

            (function() {

                mt.defineRule('', function() {

                    return true;
                });
            }).should.throwError(/name/i);
        });

        it('should not throw an error when called with a non-empty string and' +
                'a function', function() {

            (function() {

                mt.defineRule('myRule', function() {
                    return true;
                });
            }).should.not.throwError();
        });
    });
}
