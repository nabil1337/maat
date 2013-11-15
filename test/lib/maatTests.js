var should = require('should');
var path   = require('path');
var root   = path.normalize(__dirname + '/../../lib');
var Maat   = require(root + '/maat');
var mt     = null;

describe('Maat', function() {

    it('should be instantiable', function() {

        (function() {
            mt = new Maat();
        }).should.not.throwError();
    });

    describe('validate', function() {

        before(function() {
            mt = new Maat();
        });

        it('should exist', function() {

            should.exist(mt.validate);
        });

        it('should be a function', function() {

            mt.validate.should.be.type('function');
        });

        describe('called incorrectly', function() {

            it('should throw an error if called without an arguments object',
                    function() {

                (function() {
                    mt.validate();
                }).should.throwError(/arguments/i);
            });

            it('should throw an error if the passed arguments object is not ' +
                    'an object', function() {

                callingValidateOnlyWithParam('yo')
                        .should.throwError(/arguments/i);
            });

            it('should throw an error if the passed arguments object is not ' +
                    'array like', function() {

                callingValidateOnlyWithParam({})
                        .should.throwError(/arguments/i);
            });

            it('should throw an error if no arguments for validation rules ' +
                    'were passed', function() {

                callingValidateOnlyWithParam([])
                        .should.throwError(/rules/i);
            });
        });

        describe('called correctly', function() {

            describe('with one rule', function() {

                describe('defining a string', function() {

                    var rule = ['string'];

                    ensureItThrowsOnObjects(rule);
                    ensureItThrowsOnArrays(rule);

                    itShouldThrowWhenPassingANumber(rule);

                    itShouldThrowWhenPassingNothing(rule);

                    itShouldNotThrowWhenPassingNull(rule);

                    itShouldNotThrowWhenPassingAnEmptyString(rule);

                    itShouldNotThrowWhenPassingAString(rule);
                });

                describe('defining a non-nullable string', function() {

                    var rule = ['string', 'notNull'];

                    ensureItThrowsOnObjects(rule);
                    ensureItThrowsOnArrays(rule);

                    itShouldThrowWhenPassingANumber(rule);

                    itShouldThrowWhenPassingNothing(rule);

                    itShouldThrowWhenPassingNull(rule);

                    itShouldNotThrowWhenPassingAnEmptyString(rule);

                    itShouldNotThrowWhenPassingAString(rule);
                });

                describe('defining a non-empty string', function() {

                    var rule = ['string', 'notEmpty'];

                    ensureItThrowsOnObjects(rule);
                    ensureItThrowsOnArrays(rule);

                    itShouldThrowWhenPassingANumber(rule);

                    itShouldThrowWhenPassingNothing(rule);

                    itShouldThrowWhenPassingNull(rule);

                    itShouldThrowWhenPassingAnEmptyString(rule);

                    itShouldNotThrowWhenPassingAString(rule);
                });

                describe('defining an object', function() {

                    var rule = ['object'];

                    ensureItThrowsOnStrings(rule);
                    ensureItThrowsOnArrays(rule);

                    itShouldThrowWhenPassingANumber(rule);

                    itShouldThrowWhenPassingNothing(rule);

                    itShouldThrowWhenPassingAnArray(rule);

                    itShouldNotThrowWhenPassingNull(rule);

                    itShouldNotThrowWhenPassingAnEmptyObject(rule);

                    itShouldNotThrowWhenPassingAnObject(rule);
                });

                describe('defining a non-nullable object', function() {

                    var rule = ['object', 'notNull'];

                    ensureItThrowsOnStrings(rule);
                    ensureItThrowsOnArrays(rule);

                    itShouldThrowWhenPassingANumber(rule);

                    itShouldThrowWhenPassingNothing(rule);

                    itShouldThrowWhenPassingNull(rule);

                    itShouldNotThrowWhenPassingAnEmptyObject(rule);

                    itShouldNotThrowWhenPassingAnObject(rule);
                });

                describe('defining a non-empty object', function() {

                    var rule = ['object', 'notEmpty'];

                    ensureItThrowsOnStrings(rule);
                    ensureItThrowsOnArrays(rule);

                    itShouldThrowWhenPassingANumber(rule);

                    itShouldThrowWhenPassingNothing(rule);

                    itShouldThrowWhenPassingNull(rule);

                    itShouldThrowWhenPassingAnEmptyObject(rule);

                    itShouldNotThrowWhenPassingAnObject(rule);
                });

                describe('defining an array', function() {

                    var rule = ['array'];

                    ensureItThrowsOnObjects(rule);
                    ensureItThrowsOnStrings(rule);

                    itShouldThrowWhenPassingANumber(rule);

                    itShouldThrowWhenPassingNothing(rule);

                    itShouldNotThrowWhenPassingNull(rule);

                    itShouldNotThrowWhenPassingAnEmptyArray(rule);

                    itShouldNotThrowWhenPassingAnArray(rule);
                });

                describe('defining a non-nullable array', function() {

                    var rule = ['array', 'notNull'];

                    ensureItThrowsOnObjects(rule);
                    ensureItThrowsOnStrings(rule);

                    itShouldThrowWhenPassingANumber(rule);

                    itShouldThrowWhenPassingNothing(rule);

                    itShouldThrowWhenPassingNull(rule);

                    itShouldNotThrowWhenPassingAnEmptyArray(rule);

                    itShouldNotThrowWhenPassingAnArray(rule);
                });

                describe('defining a non-empty array', function() {

                    var rule = ['array', 'notEmpty'];

                    ensureItThrowsOnObjects(rule);
                    ensureItThrowsOnStrings(rule);

                    itShouldThrowWhenPassingANumber(rule);

                    itShouldThrowWhenPassingNothing(rule);

                    itShouldThrowWhenPassingNull(rule);

                    itShouldThrowWhenPassingAnEmptyArray(rule);

                    itShouldNotThrowWhenPassingAnArray(rule);
                });

                describe('defining a number', function() {

                    var rule = ['number'];

                    ensureItThrowsOnObjects(rule);
                    ensureItThrowsOnStrings(rule);
                    ensureItThrowsOnArrays(rule);

                    itShouldNotThrowWhenPassingNull(rule);

                    itShouldNotThrowWhenPassingANumber(rule);
                });

                describe('defining a non-nullable number', function() {

                    var rule = ['number', 'notNull'];

                    ensureItThrowsOnObjects(rule);
                    ensureItThrowsOnStrings(rule);
                    ensureItThrowsOnArrays(rule);

                    itShouldThrowWhenPassingNull(rule);
                    itShouldNotThrowWhenPassingANumber(rule);
                });
            });
        });
    });
});

function ensureItThrowsOnObjects(rule) {

    itShouldThrowWhenPassingAnEmptyObject(rule);
    itShouldThrowWhenPassingAnObject(rule);
}

function ensureItThrowsOnStrings(rule) {

    itShouldThrowWhenPassingAnEmptyString(rule);
    itShouldThrowWhenPassingAString(rule);
}

function ensureItThrowsOnArrays(rule) {

    itShouldThrowWhenPassingAnEmptyArray(rule);
    itShouldThrowWhenPassingAnArray(rule);
}

function itShouldThrowWhenPassingNothing(rule) {

    it('should throw an error when passing nothing',
            function() {

        callingValidateWithParamAndOneRule([], rule)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingNull(rule) {

    it('should throw an error when passing null', function() {

        callingValidateWithOneArgAndOneRule(null, rule)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAString(rule) {

    it('should throw an error when passing a string', function() {

        callingValidateWithOneArgAndOneRule('yoo', rule)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAnEmptyString(rule) {

    it('should throw an error when passing an empty string', function() {

        callingValidateWithOneArgAndOneRule('', rule)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingANumber(rule) {

    it('should throw an error when passing a number', function() {

        callingValidateWithOneArgAndOneRule(12, rule)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAnObject(rule) {
    it('should throw an error when passing an object', function() {

        callingValidateWithOneArgAndOneRule({bla: 'blubb'}, rule)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAnEmptyObject(rule) {

    it('should throw an error when passing an empty object', function() {

        callingValidateWithOneArgAndOneRule({}, rule)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAnArray(rule) {

    it('should throw an error when passing an array', function() {

        callingValidateWithOneArgAndOneRule(['yaa', 1, 2, 3], rule)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAnEmptyArray(rule) {

    it('should throw an error when passing an empty array', function() {

        callingValidateWithOneArgAndOneRule([], rule)
                .should.throwError(/invalid/i);
    });
}

function itShouldNotThrowWhenPassingAString(rule) {

    it('should not throw an error when passing a string',
            function() {

        callingValidateWithOneArgAndOneRule('yoo', rule)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAnEmptyString(rule) {
    it('should not throw an error when passing an ' +
            'empty string', function() {

        callingValidateWithOneArgAndOneRule('', rule)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAnEmptyArray(rule) {

    it('should not throw when passing an empty array', function() {

        callingValidateWithOneArgAndOneRule([], rule)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAnArray(rule) {

    it('should not throw when passing an array', function() {

        callingValidateWithOneArgAndOneRule(['ya', 1, 2, 3], rule)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingANumber(rule) {

    it('should not throw an error when passing a number', function() {
        callingValidateWithOneArgAndOneRule(23, rule)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingNull(rule) {

    it('should not throw an error when passing null', function() {

        callingValidateWithOneArgAndOneRule(null, rule)
                .should.not.throwError();
    });
};

function itShouldNotThrowWhenPassingAnEmptyObject(rule) {

    it('should not throw an error when passing an empty object', function() {

        callingValidateWithOneArgAndOneRule({}, rule)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAnObject(rule) {

    it('should not throw an error when passing an object', function() {

        callingValidateWithOneArgAndOneRule({bla: 'blubb'}, rule)
                .should.not.throwError();
    });
}


var callingValidateOnlyWithParam = function(arg) {

    return function() {
        mt.validate(arg);
    };
};

var callingValidateWithParamAndOneRule = function(args, rule) {

    return function() {
        mt.validate(args, rule);
    };
};

var callingValidateWithOneArgAndOneRule = function(arg, rule) {

    var args = arguments;

    return function() {
        mt.validate(args, rule);
    };
};

