var should = require('should');
var path   = require('path');
var root   = path.normalize(__dirname + '/../../../lib');
var Maat   = require(root + '/maat');
var mt     = null;


describe('Maat validate called correctly with custom rules', function() {

    beforeEach(function() {
        mt = new Maat();
    });

    processMaatValidateCalledCorrectlyWithCustomRules();
});

function processMaatValidateCalledCorrectlyWithCustomRules() {

    it('should throw an error if the specified custom rule isn\'t defined',
            function() {

        var ruleList = ['string', 'customRuleX'];

        (function() {

            (function() {

                mt.validate(arguments, ruleList);
            })('blub');
        }).should.throwError(/customRuleX/i);
    });

    it('should throw an error if the second specified custom rule isn\'t ' +
            'defined but the first one is', function() {

        var ruleList = ['string', 'customRuleY', 'myCustomRule'];

        (function() {

            mt.defineRule('customRuleY', function() {

                return true;
            });

            (function() {

                mt.validate(arguments, ruleList);
            })('okay', 'yes', 'maybe');
        }).should.throwError(/myCustomRule/i);
    });

    describe('called without regular rules', function() {

        it('should throw an error if the passed argument doesn\'t pass the' +
            'custom rule', function() {

            var ruleList = ['isYesString'];

            (function() {

                (function() {

                    defineRuleIsYesString(mt);

                    mt.validate(arguments, ruleList);
                })('nope');
            }).should.throwError(/invalid/i);
        });

        it('should throw an error if the second passed argument doesn\'t ' +
                'pass the custom rule but the first one does', function() {

            var ruleList1 = ['isYesString'];
            var ruleList2 = ['isYesString'];

            (function() {

                (function() {

                    defineRuleIsYesString(mt);

                    mt.validate(arguments, ruleList1, ruleList2);
                })('yes', 'nope');
            }).should.throwError(/position 2$/i);
        });

        it('should not throw an error if the passed argument passes the' +
                'custom rule', function() {

            var ruleList = ['isYesString'];

            (function() {

                (function() {

                    defineRuleIsYesString(mt);

                    mt.validate(arguments, ruleList);
                })('yes');
            }).should.not.throwError();
        });
    });

    describe('called mixed with regular rules', function() {

        it('should throw an error if the passed argument doesn\'t pass the' +
            'custom rule but the regular one', function() {


                var ruleList = ['string', 'isYesString'];

                (function() {

                    (function() {

                        defineRuleIsYesString(mt);

                        mt.validate(arguments, ruleList);
                    })('nope');
                }).should.throwError(/invalid/i);
        });

    });
}

function defineRuleIsYesString(mt) {

    mt.defineRule('isYesString', function(arg) {

        if ('yes' === arg.toLowerCase()) {

            return true;
        }

        return false;
    });
}
