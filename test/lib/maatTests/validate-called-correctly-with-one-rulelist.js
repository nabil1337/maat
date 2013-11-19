var should = require('should');
var path   = require('path');
var root   = path.normalize(__dirname + '/../../../lib');
var Maat   = require(root + '/maat');
var mt     = null;


describe('Maat validate called correctly with one rulelist', function() {

    before(function() {
        mt = new Maat();
    });

    processMaatValidateCalledCorrectlyWithOneRulelist();
});

function processMaatValidateCalledCorrectlyWithOneRulelist() {

    describe('defining a string', function() {

        var ruleList = ['string'];

        ensureStringThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);

        itShouldNotThrowWhenPassingNull(ruleList);
        itShouldNotThrowWhenPassingAnEmptyString(ruleList);
        itShouldNotThrowWhenPassingAString(ruleList);
    });

    describe('defining an optional string', function() {

        var ruleList = ['string', 'optional'];

        ensureStringThrowsWhenPassingWrongTypes(ruleList);

        itShouldNotThrowWhenPassingNothing(ruleList);

        itShouldNotThrowWhenPassingNull(ruleList);
        itShouldNotThrowWhenPassingAnEmptyString(ruleList);
        itShouldNotThrowWhenPassingAString(ruleList);
    });

    describe('defining a non-nullable string', function() {

        var ruleList = ['string', 'notNull'];

        ensureStringThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);
        itShouldThrowWhenPassingNull(ruleList);

        itShouldNotThrowWhenPassingAnEmptyString(ruleList);
        itShouldNotThrowWhenPassingAString(ruleList);
    });

    describe('defining a non-empty string', function() {

        var ruleList = ['string', 'notEmpty'];

        ensureStringThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);
        itShouldThrowWhenPassingNull(ruleList);
        itShouldThrowWhenPassingAnEmptyString(ruleList);

        itShouldNotThrowWhenPassingAString(ruleList);
    });

    describe('defining an object', function() {

        var ruleList = ['object'];

        ensureObjectThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);

        itShouldNotThrowWhenPassingNull(ruleList);
        itShouldNotThrowWhenPassingAnEmptyObject(ruleList);
        itShouldNotThrowWhenPassingAnObject(ruleList);
    });

    describe('defining an optional object', function() {

        var ruleList = ['object', 'optional'];

        ensureObjectThrowsWhenPassingWrongTypes(ruleList);

        itShouldNotThrowWhenPassingNothing(ruleList);
        itShouldNotThrowWhenPassingNull(ruleList);
        itShouldNotThrowWhenPassingAnEmptyObject(ruleList);
        itShouldNotThrowWhenPassingAnObject(ruleList);
    });

    describe('defining a non-nullable object', function() {

        var ruleList = ['object', 'notNull'];

        ensureObjectThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);
        itShouldThrowWhenPassingNull(ruleList);

        itShouldNotThrowWhenPassingAnEmptyObject(ruleList);
        itShouldNotThrowWhenPassingAnObject(ruleList);
    });

    describe('defining a non-empty object', function() {

        var ruleList = ['object', 'notEmpty'];

        ensureObjectThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);
        itShouldThrowWhenPassingNull(ruleList);
        itShouldThrowWhenPassingAnEmptyObject(ruleList);

        itShouldNotThrowWhenPassingAnObject(ruleList);
    });

    describe('defining an array', function() {

        var ruleList = ['array'];

        ensureArrayThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);

        itShouldNotThrowWhenPassingNull(ruleList);
        itShouldNotThrowWhenPassingAnEmptyArray(ruleList);
        itShouldNotThrowWhenPassingAnArray(ruleList);
    });

    describe('defining an optional array', function() {

        var ruleList = ['array', 'optional'];

        ensureArrayThrowsWhenPassingWrongTypes(ruleList);

        itShouldNotThrowWhenPassingNothing(ruleList);
        itShouldNotThrowWhenPassingNull(ruleList);
        itShouldNotThrowWhenPassingAnEmptyArray(ruleList);
        itShouldNotThrowWhenPassingAnArray(ruleList);
    });

    describe('defining a non-nullable array', function() {

        var ruleList = ['array', 'notNull'];

        ensureArrayThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);
        itShouldThrowWhenPassingNull(ruleList);

        itShouldNotThrowWhenPassingAnEmptyArray(ruleList);
        itShouldNotThrowWhenPassingAnArray(ruleList);
    });

    describe('defining a non-empty array', function() {

        var ruleList = ['array', 'notEmpty'];

        ensureArrayThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);
        itShouldThrowWhenPassingNull(ruleList);
        itShouldThrowWhenPassingAnEmptyArray(ruleList);

        itShouldNotThrowWhenPassingAnArray(ruleList);
    });

    describe('defining a number', function() {

        var ruleList = ['number'];

        ensureNumberThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);

        itShouldNotThrowWhenPassingNull(ruleList);
        itShouldNotThrowWhenPassingNaN(ruleList);
        itShouldNotThrowWhenPassingANumber(ruleList);
    });

    describe('defining an optional number', function() {

        var ruleList = ['number', 'optional'];

        ensureNumberThrowsWhenPassingWrongTypes(ruleList);

        itShouldNotThrowWhenPassingNothing(ruleList);
        itShouldNotThrowWhenPassingNull(ruleList);
        itShouldNotThrowWhenPassingNaN(ruleList);
        itShouldNotThrowWhenPassingANumber(ruleList);
    });

    describe('defining a non-nullable number', function() {

        var ruleList = ['number', 'notNull'];

        ensureNumberThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);
        itShouldThrowWhenPassingNull(ruleList);

        itShouldNotThrowWhenPassingNaN(ruleList);
        itShouldNotThrowWhenPassingANumber(ruleList);
    });

    describe('defining a non-NaN number', function() {

        var ruleList = ['number', 'notNaN'];

        ensureNumberThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);
        itShouldThrowWhenPassingNaN(ruleList);

        itShouldNotThrowWhenPassingNull(ruleList);
        itShouldNotThrowWhenPassingANumber(ruleList);
    });

    describe('defining a non-nullable and non-NaN number',
            function() {

        var ruleList = ['number', 'notNaN', 'notNull'];

        ensureNumberThrowsWhenPassingWrongTypes(ruleList);

        itShouldThrowWhenPassingNothing(ruleList);
        itShouldThrowWhenPassingNaN(ruleList);
        itShouldThrowWhenPassingNull(ruleList);

        itShouldNotThrowWhenPassingANumber(ruleList);
    });

    describe('defining an array or number', function() {

        var ruleList = ['array', 'number'];

        itShouldThrowWhenPassingNothing(ruleList);
        itShouldThrowWhenPassingAnObject(ruleList);
        itShouldThrowWhenPassingAString(ruleList);
        itShouldThrowWhenPassingAnEmptyString(ruleList);

        itShouldNotThrowWhenPassingAnEmptyArray(ruleList);
        itShouldNotThrowWhenPassingAnArray(ruleList);
        itShouldNotThrowWhenPassingANumber(ruleList);
    });

    describe('defining a optional string or number which may not be empty',
            function() {

        var ruleList = ['string', 'number', 'optional', 'notEmpty'];

        itShouldThrowWhenPassingAnObject(ruleList);
        itShouldThrowWhenPassingAnArray(ruleList);
        itShouldThrowWhenPassingAnEmptyString(ruleList);
        itShouldThrowWhenPassingNull(ruleList);

        itShouldNotThrowWhenPassingNothing(ruleList);
        itShouldNotThrowWhenPassingANumber(ruleList);
        itShouldNotThrowWhenPassingAString(ruleList);
    });

    describe('defining an optional object or array which may not be null',
            function() {

        var ruleList = ['object', 'array', 'notNull'];

        itShouldThrowWhenPassingAString(ruleList);
        itShouldThrowWhenPassingANumber(ruleList);
        itShouldThrowWhenPassingNull(ruleList);

        itShouldNotThrowWhenPassingAnEmptyObject(ruleList);
        itShouldNotThrowWhenPassingAnEmptyArray(ruleList);
        itShouldNotThrowWhenPassingAnArray(ruleList);
        itShouldNotThrowWhenPassingAnObject(ruleList);
    });
};

function ensureStringThrowsWhenPassingWrongTypes(ruleList) {

    ensureItThrowsOnObjects(ruleList);
    ensureItThrowsOnArrays(ruleList);
    itShouldThrowWhenPassingANumber(ruleList);
}

function ensureObjectThrowsWhenPassingWrongTypes(ruleList) {

    ensureItThrowsOnStrings(ruleList);
    ensureItThrowsOnArrays(ruleList);
    itShouldThrowWhenPassingANumber(ruleList);
}

function ensureArrayThrowsWhenPassingWrongTypes(ruleList) {

    ensureItThrowsOnObjects(ruleList);
    ensureItThrowsOnStrings(ruleList);
    itShouldThrowWhenPassingANumber(ruleList);
}

function ensureNumberThrowsWhenPassingWrongTypes(ruleList) {

    ensureItThrowsOnObjects(ruleList);
    ensureItThrowsOnStrings(ruleList);
    ensureItThrowsOnArrays(ruleList);
}

function ensureItThrowsOnObjects(ruleList) {

    itShouldThrowWhenPassingAnEmptyObject(ruleList);
    itShouldThrowWhenPassingAnObject(ruleList);
}

function ensureItThrowsOnStrings(ruleList) {

    itShouldThrowWhenPassingAnEmptyString(ruleList);
    itShouldThrowWhenPassingAString(ruleList);
}

function ensureItThrowsOnArrays(ruleList) {

    itShouldThrowWhenPassingAnEmptyArray(ruleList);
    itShouldThrowWhenPassingAnArray(ruleList);
}

function itShouldThrowWhenPassingNothing(ruleList) {

    it('should throw an error when passing nothing',
            function() {

        callingValidateWithParamAndOneRulelist({length: 0}, ruleList)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingNull(ruleList) {

    it('should throw an error when passing null', function() {

        callingValidateWithOneArgAndOneRulelist(null, ruleList)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAString(ruleList) {

    it('should throw an error when passing a string', function() {

        callingValidateWithOneArgAndOneRulelist('yoo', ruleList)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAnEmptyString(ruleList) {

    it('should throw an error when passing an empty string', function() {

        callingValidateWithOneArgAndOneRulelist('', ruleList)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingANumber(ruleList) {

    it('should throw an error when passing a number', function() {

        callingValidateWithOneArgAndOneRulelist(12, ruleList)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingNaN(ruleList) {

    it('should throw an error when passing NaN', function() {

        callingValidateWithOneArgAndOneRulelist(NaN, ruleList)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAnObject(ruleList) {
    it('should throw an error when passing an object', function() {

        callingValidateWithOneArgAndOneRulelist({bla: 'blubb'}, ruleList)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAnEmptyObject(ruleList) {

    it('should throw an error when passing an empty object', function() {

        callingValidateWithOneArgAndOneRulelist({}, ruleList)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAnArray(ruleList) {

    it('should throw an error when passing an array', function() {

        callingValidateWithOneArgAndOneRulelist(['yaa', 1, 2, 3], ruleList)
                .should.throwError(/invalid/i);
    });
}

function itShouldThrowWhenPassingAnEmptyArray(ruleList) {

    it('should throw an error when passing an empty array', function() {

        callingValidateWithOneArgAndOneRulelist([], ruleList)
                .should.throwError(/invalid/i);
    });
}

function itShouldNotThrowWhenPassingNothing(ruleList) {

    it('should not throw an error when passing nothing',
            function() {

        callingValidateWithParamAndOneRulelist({length: 0}, ruleList)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAString(ruleList) {

    it('should not throw an error when passing a string', function() {

        callingValidateWithOneArgAndOneRulelist('yoo', ruleList)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAnEmptyString(ruleList) {

    it('should not throw an error when passing an ' +
            'empty string', function() {

        callingValidateWithOneArgAndOneRulelist('', ruleList)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAnEmptyArray(ruleList) {

    it('should not throw an error when passing an empty array', function() {

        callingValidateWithOneArgAndOneRulelist([], ruleList)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAnArray(ruleList) {

    it('should not throw an error when passing an array', function() {

        callingValidateWithOneArgAndOneRulelist(['ya', 1, 2, 3], ruleList)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingANumber(ruleList) {

    it('should not throw an error when passing a number', function() {
        callingValidateWithOneArgAndOneRulelist(23, ruleList)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingNaN(ruleList) {

    it('should not throw an error when passing NaN', function() {

        callingValidateWithOneArgAndOneRulelist(NaN, ruleList)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingNull(ruleList) {

    it('should not throw an error when passing null', function() {

        callingValidateWithOneArgAndOneRulelist(null, ruleList)
                .should.not.throwError();
    });
};

function itShouldNotThrowWhenPassingAnEmptyObject(ruleList) {

    it('should not throw an error when passing an empty object', function() {

        callingValidateWithOneArgAndOneRulelist({}, ruleList)
                .should.not.throwError();
    });
}

function itShouldNotThrowWhenPassingAnObject(ruleList) {

    it('should not throw an error when passing an object', function() {

        callingValidateWithOneArgAndOneRulelist({bla: 'blubb'}, ruleList)
                .should.not.throwError();
    });
}


var callingValidateWithParamAndOneRulelist = function(args, ruleList) {

    return function() {
        mt.validate(args, ruleList);
    };
};

var callingValidateWithOneArgAndOneRulelist = function(arg, ruleList) {

    var args = arguments;

    return function() {
        mt.validate(args, ruleList);
    };
};
