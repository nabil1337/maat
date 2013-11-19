var should = require('should');
var path   = require('path');
var root   = path.normalize(__dirname + '/../../../lib');
var Maat   = require(root + '/maat');
var mt     = null;


describe('Maat validate called correctly with multiple rulelists', function() {

    before(function() {
        mt = new Maat();
    });

    processMaatValidateCalledCorrectlyWithMultipleRulelists();
});

function processMaatValidateCalledCorrectlyWithMultipleRulelists() {

    describe('defining a non-nullable string and a not-empty object', function() {

        var ruleList1 = ['string', 'notNull'];
        var ruleList2 = ['object', 'notEmpty'];

        it('should throw an error when passing nothing', function() {

            (function() {

                mt.validate(arguments, ruleList1, ruleList2);
            }).should.throwError(/invalid/i);
        });

        it('should not throw an error when passing an empty string and a ' +
                'non-empty object', function() {

            (function() {

                (function() {

                    mt.validate(arguments, ruleList1, ruleList2);
                })('', {bla: 'bla'});
            }).should.not.throwError();
        });

        describe('and passing the function name', function() {

            it('should throw an error when passing a string as the first and ' +
                    'an empty object as the second parameter', function() {

                (function() {

                    (function() {

                        mt.validate('myCustomFunc', arguments, ruleList1, ruleList2);
                    })('yoo', {});
                }).should.throwError();
            });

            it('should not throw an error when passing an empty string and a ' +
                'non-empty object', function() {

                (function() {

                    (function() {

                        mt.validate('myCustomFunc', arguments, ruleList1, ruleList2);
                    })('', {bla: 'bla'});
                }).should.not.throwError();
            });
        });
    });
};
