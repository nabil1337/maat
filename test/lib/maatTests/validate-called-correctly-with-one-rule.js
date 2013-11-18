var should = require('should');
var path   = require('path');
var root   = path.normalize(__dirname + '/../../../lib');
var Maat   = require(root + '/maat');
var mt     = null;


describe('Maat validate called correctly with one rule', function() {

    before(function() {
        mt = new Maat();
    });

    processMaatValidateCalledCorrectlyWithOneRule();
});

function processMaatValidateCalledCorrectlyWithOneRule() {

    describe('defining a string', function() {

        var rule = ['string'];

        ensureStringThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);

        itShouldNotThrowWhenPassingNull(rule);
        itShouldNotThrowWhenPassingAnEmptyString(rule);
        itShouldNotThrowWhenPassingAString(rule);
    });

    describe('defining an optional string', function() {

        var rule = ['string', 'optional'];

        ensureStringThrowsWhenPassingWrongTypes(rule);

        itShouldNotThrowWhenPassingNothing(rule);

        itShouldNotThrowWhenPassingNull(rule);
        itShouldNotThrowWhenPassingAnEmptyString(rule);
        itShouldNotThrowWhenPassingAString(rule);
    });

    describe('defining a non-nullable string', function() {

        var rule = ['string', 'notNull'];

        ensureStringThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);
        itShouldThrowWhenPassingNull(rule);

        itShouldNotThrowWhenPassingAnEmptyString(rule);
        itShouldNotThrowWhenPassingAString(rule);
    });

    describe('defining a non-empty string', function() {

        var rule = ['string', 'notEmpty'];

        ensureStringThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);
        itShouldThrowWhenPassingNull(rule);
        itShouldThrowWhenPassingAnEmptyString(rule);

        itShouldNotThrowWhenPassingAString(rule);
    });

    describe('defining an object', function() {

        var rule = ['object'];

        ensureObjectThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);

        itShouldNotThrowWhenPassingNull(rule);
        itShouldNotThrowWhenPassingAnEmptyObject(rule);
        itShouldNotThrowWhenPassingAnObject(rule);
    });

    describe('defining an optional object', function() {

        var rule = ['object', 'optional'];

        ensureObjectThrowsWhenPassingWrongTypes(rule);

        itShouldNotThrowWhenPassingNothing(rule);
        itShouldNotThrowWhenPassingNull(rule);
        itShouldNotThrowWhenPassingAnEmptyObject(rule);
        itShouldNotThrowWhenPassingAnObject(rule);
    });

    describe('defining a non-nullable object', function() {

        var rule = ['object', 'notNull'];

        ensureObjectThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);
        itShouldThrowWhenPassingNull(rule);

        itShouldNotThrowWhenPassingAnEmptyObject(rule);
        itShouldNotThrowWhenPassingAnObject(rule);
    });

    describe('defining a non-empty object', function() {

        var rule = ['object', 'notEmpty'];

        ensureObjectThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);
        itShouldThrowWhenPassingNull(rule);
        itShouldThrowWhenPassingAnEmptyObject(rule);

        itShouldNotThrowWhenPassingAnObject(rule);
    });

    describe('defining an array', function() {

        var rule = ['array'];

        ensureArrayThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);

        itShouldNotThrowWhenPassingNull(rule);
        itShouldNotThrowWhenPassingAnEmptyArray(rule);
        itShouldNotThrowWhenPassingAnArray(rule);
    });

    describe('defining an optional array', function() {

        var rule = ['array', 'optional'];

        ensureArrayThrowsWhenPassingWrongTypes(rule);

        itShouldNotThrowWhenPassingNothing(rule);
        itShouldNotThrowWhenPassingNull(rule);
        itShouldNotThrowWhenPassingAnEmptyArray(rule);
        itShouldNotThrowWhenPassingAnArray(rule);
    });

    describe('defining a non-nullable array', function() {

        var rule = ['array', 'notNull'];

        ensureArrayThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);
        itShouldThrowWhenPassingNull(rule);

        itShouldNotThrowWhenPassingAnEmptyArray(rule);
        itShouldNotThrowWhenPassingAnArray(rule);
    });

    describe('defining a non-empty array', function() {

        var rule = ['array', 'notEmpty'];

        ensureArrayThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);
        itShouldThrowWhenPassingNull(rule);
        itShouldThrowWhenPassingAnEmptyArray(rule);

        itShouldNotThrowWhenPassingAnArray(rule);
    });

    describe('defining a number', function() {

        var rule = ['number'];

        ensureNumberThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);

        itShouldNotThrowWhenPassingNull(rule);
        itShouldNotThrowWhenPassingNaN(rule);
        itShouldNotThrowWhenPassingANumber(rule);
    });

    describe('defining an optional number', function() {

        var rule = ['number', 'optional'];

        ensureNumberThrowsWhenPassingWrongTypes(rule);

        itShouldNotThrowWhenPassingNothing(rule);
        itShouldNotThrowWhenPassingNull(rule);
        itShouldNotThrowWhenPassingNaN(rule);
        itShouldNotThrowWhenPassingANumber(rule);
    });

    describe('defining a non-nullable number', function() {

        var rule = ['number', 'notNull'];

        ensureNumberThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);
        itShouldThrowWhenPassingNull(rule);

        itShouldNotThrowWhenPassingNaN(rule);
        itShouldNotThrowWhenPassingANumber(rule);
    });

    describe('defining a non-NaN number', function() {

        var rule = ['number', 'notNaN'];

        ensureNumberThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);
        itShouldThrowWhenPassingNaN(rule);

        itShouldNotThrowWhenPassingNull(rule);
        itShouldNotThrowWhenPassingANumber(rule);
    });

    describe('defining a non-nullable and non-NaN number',
            function() {

        var rule = ['number', 'notNaN', 'notNull'];

        ensureNumberThrowsWhenPassingWrongTypes(rule);

        itShouldThrowWhenPassingNothing(rule);
        itShouldThrowWhenPassingNaN(rule);
        itShouldThrowWhenPassingNull(rule);

        itShouldNotThrowWhenPassingANumber(rule);
    });

    describe('defining an array or number', function() {

        var rule = ['array', 'number'];

        itShouldThrowWhenPassingNothing(rule);
        itShouldThrowWhenPassingAnObject(rule);
        itShouldThrowWhenPassingAString(rule);
        itShouldThrowWhenPassingAnEmptyString(rule);

        itShouldNotThrowWhenPassingAnEmptyArray(rule);
        itShouldNotThrowWhenPassingAnArray(rule);
        itShouldNotThrowWhenPassingANumber(rule);
    });

    describe('defining a optional string or number which may not be empty',
            function() {

        var rule = ['string', 'number', 'optional', 'notEmpty'];

        itShouldThrowWhenPassingAnObject(rule);
        itShouldThrowWhenPassingAnArray(rule);
        itShouldThrowWhenPassingAnEmptyString(rule);
        itShouldThrowWhenPassingNull(rule);

        itShouldNotThrowWhenPassingNothing(rule);
        itShouldNotThrowWhenPassingANumber(rule);
        itShouldNotThrowWhenPassingAString(rule);
    });
};

function ensureStringThrowsWhenPassingWrongTypes(rule) {

    ensureItThrowsOnObjects(rule);
    ensureItThrowsOnArrays(rule);
    itShouldThrowWhenPassingANumber(rule);
}

function ensureObjectThrowsWhenPassingWrongTypes(rule) {

    ensureItThrowsOnStrings(rule);
    ensureItThrowsOnArrays(rule);
    itShouldThrowWhenPassingANumber(rule);
}

function ensureArrayThrowsWhenPassingWrongTypes(rule) {

    ensureItThrowsOnObjects(rule);
    ensureItThrowsOnStrings(rule);
    itShouldThrowWhenPassingANumber(rule);
}

function ensureNumberThrowsWhenPassingWrongTypes(rule) {

    ensureItThrowsOnObjects(rule);
    ensureItThrowsOnStrings(rule);
    ensureItThrowsOnArrays(rule);
}

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

function itShouldThrowWhenPassingNaN(rule) {

    it('should throw an error when passing NaN', function() {

        callingValidateWithOneArgAndOneRule(NaN, rule)
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

function itShouldNotThrowWhenPassingNothing(rule) {

    it('should not throw an error when passing nothing',
            function() {

        callingValidateWithParamAndOneRule([], rule)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAString(rule) {

    it('should not throw an error when passing a string', function() {

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

    it('should not throw an error when passing an empty array', function() {

        callingValidateWithOneArgAndOneRule([], rule)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAnArray(rule) {

    it('should not throw an error when passing an array', function() {

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

function itShouldNotThrowWhenPassingNaN(rule) {

    it('should not throw an error when passing NaN', function() {

        callingValidateWithOneArgAndOneRule(NaN, rule)
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
