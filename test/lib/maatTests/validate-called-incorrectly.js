var should = require('should');
var path   = require('path');
var root   = path.normalize(__dirname + '/../../../lib');
var Maat   = require(root + '/maat');
var mt     = null;


describe('Maat validate called incorrectly', function() {

    before(function() {
        mt = new Maat();
    });

    processMaatValidateCalledIncorrectly();
});

function processMaatValidateCalledIncorrectly() {

    it('should throw an error if called without an arguments object',
            function() {

        (function() {
            mt.validate();
        }).should.throwError(/arguments/i);
    });

    it('should throw an error if the passed arguments object is not ' +
            'an object', function() {

        callingValidateOnlyWithParam('name', 'yo')
                .should.throwError(/arguments/i);
    });

    it('should throw an error if the passed arguments object is not ' +
            'array like', function() {

        callingValidateOnlyWithParam({})
                .should.throwError(/arguments/i);
    });

    it('should throw an error if no arguments for validation rules ' +
            'were passed', function() {

        callingValidateOnlyWithParam({length: 0})
                .should.throwError(/rules/i);
    });
}

var callingValidateOnlyWithParam = function(arg) {

    return function() {
        mt.validate(arg);
    };
};
