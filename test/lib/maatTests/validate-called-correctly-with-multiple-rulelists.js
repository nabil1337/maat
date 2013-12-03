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

    describe('defining a string, an object, a string or array and a ' +
            'number', function() {

        var ruleList1 = ['string'];
        var ruleList2 = ['object'];
        var ruleList3 = ['string', 'array'];
        var ruleList4 = ['number'];

        it('should throw an error when passing a wrong fourth argument ' +
                '(empty string) ', function() {

            callingValidateWithFourRuleListsAndFourArguments(ruleList1,
                    ruleList2, ruleList3, ruleList4, '', {}, '', '')
                    .should.throwError(/position 4$/i);
        });

        it('should throw an error when passing a wrong first (object) and ' +
                'fourth argument (empty string) ', function() {

            callingValidateWithFourRuleListsAndFourArguments(
                    ruleList1, ruleList2, ruleList3, ruleList4, {}, {}, [], '')
                    .should.throwError(/position 1$/i);
        });

        it('should throw an error when omitting an argument', function() {

            callingValidateWithFourRuleListsAndFourArguments(
                    ruleList1, ruleList2, ruleList3, ruleList4, '', {}, [])
                    .should.throwError(/position 4$/i);
        });

        it('should not throw an error when passing correct arguments', function() {

            callingValidateWithFourRuleListsAndFourArguments(ruleList1,
                    ruleList2, ruleList3, ruleList4, '', {}, '', 1)
                    .should.not.throwError();

            callingValidateWithFourRuleListsAndFourArguments(ruleList1,
                    ruleList2, ruleList3, ruleList4, '', {}, [], 1)
                    .should.not.throwError();
        });
    });
};


function callingValidateWithFourRuleListsAndFourArguments(r1, r2, r3, r4,
        a1, a2, a3, a4) {

    return (function() {

        (function() {

            mt.validate(arguments, r1, r2, r3, r4);
        })(a1, a2, a3, a4);
    });
}
