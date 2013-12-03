var should    = require('should');
var path      = require('path');
var Validator = require('validator').Validator;
var root      = path.normalize(__dirname + '/../../../lib');
var Maat      = require(root + '/maat');
var mt        = null;
var vr        = null;


describe('Maat validate called correctly with custom rules', function() {

    before(function() {

        // so it doesn't throw errors
        Validator.prototype.error = function() {

        };
    });

    beforeEach(function() {
        mt = new Maat();
        vr = new Validator();
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

        it('should throw an error if the passed argument doesn\'t pass the ' +
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

        it('should not throw an error if the passed argument passes the ' +
                'custom rule', function() {

            var ruleList = ['isYesString'];

            (function() {

                (function() {

                    defineRuleIsYesString(mt);

                    mt.validate(arguments, ruleList);
                })('yes');
            }).should.not.throwError();
        });

        it('should only consider the last defined rule if the same rule is ' +
                'defined multiple times', function() {

            var ruleList = ['isYesString'];

            (function() {

                (function() {

                    defineRuleIsYesString(mt);

                    mt.defineRule('isYesString', function(arg) {

                        if ('yes' === arg) {
                            return true;
                        }

                        return false;
                    });

                    mt.validate(arguments, ruleList);
                })('YES');
            }).should.throwError(/invalid/i);
        });

        it('should not modify the original error message, if an error occurs ' +
                'within a custom validator', function() {

            var ruleList = ['customVal'];

            (function() {

                (function() {

                    mt.defineRule('customVal', function() {

                        throw new Error('myCustomErrorMsg');
                    });

                    mt.validate(arguments, ruleList);
                })('param');
            }).should.throwError('myCustomErrorMsg');
        });
    });

    describe('called mixed with regular rules', function() {

        it('should throw an error if the passed argument doesn\'t pass the ' +
                'custom rule but the regular one', function() {

            var ruleList = ['string', 'isYesString'];

            (function() {

                (function() {

                    defineRuleIsYesString(mt);

                    mt.validate(arguments, ruleList);
                })('nope');
            }).should.throwError(/invalid/i);
        });

        it('should throw an error if the passed argument doesn\'t pass the ' +
                'regular rule but the custom one', function() {

            var ruleList = ['isYesString', 'object'];

            (function() {

                (function() {

                    defineRuleIsYesString(mt);

                    mt.validate(arguments, ruleList);
                })({});
            }).should.throwError(/invalid/i);
        });
    });

    describe('using external validators', function() {

        it('should throw an error if the passed argument doesn\'t pass the ' +
                ' custom rule', function() {

            var ruleList = ['customInt'];

            (function() {

                mt.defineRule('customInt', function(arg) {

                    return vr.check(arg).isUUID(1);
                });

                (function() {

                    mt.validate(arguments, ruleList);
                })('jop');
            }).should.throwError(/invalid/i);
        });

        it('should not throw an error if the passed argument passes the ' +
                'custom rule', function() {

            var ruleList = ['customInt'];

            (function() {

                mt.defineRule('customInt', function(arg) {

                    return vr.check(arg).isUUID(1);
                });

                (function() {

                    mt.validate(arguments, ruleList);
                })('550e8400-e29b-11d4-a716-446655440000');
            }).should.not.throwError();
        });
    });
}

function defineRuleIsYesString(mt) {

    mt.defineRule('isYesString', function(arg) {

        if ('string' === typeof arg && 'yes' === arg.toLowerCase()) {

            return true;
        }

        return false;
    });
}
