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

        beforeEach(function() {
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

                (function() {
                    mt.validate('yo');
                }).should.throwError(/arguments/i);
            });

            it('should throw an error if the passed arguments object is not ' +
                    'array like', function() {

                (function() {
                    mt.validate({});
                }).should.throwError(/arguments/i);
            });

            it('should throw an error if no arguments for validation rules ' +
                    'were passed', function() {

                (function() {
                    mt.validate([]);
                }).should.throwError(/rules/);
            });
        });

        describe('called correctly', function() {

            describe('with one rule', function() {

                describe('defining a non-nullable string', function() {

                    var rule = ['string', 'notNull'];

                    it('should throw an error when passing nothing',
                            function() {

                        callValidateWithOneArgAndOneRule([], rule)
                                .should.throwError(/invalid/i);
                    });

                    it('should throw an error when passing null', function() {

                        callValidateWithOneArgAndOneRule(null, rule)
                                .should.throwError(/invalid/i);
                    });

                    it('should not throw an error when passing an ' +
                            'empty string', function() {

                        callValidateWithOneArgAndOneRule('', rule)
                                .should.not.throwError();
                    });

                    it('should not throw an error when passing a string',
                            function() {

                        callValidateWithOneArgAndOneRule('yoo', rule)
                                .should.not.throwError();
                    });

                });

                describe('defining a non-empty string', function() {

                    var rule = ['string', 'notEmpty'];

                    it('should throw an error when passing nothing',
                            function() {

                        callValidateWithOneArgAndOneRule([], rule)
                                .should.throwError(/invalid/i);
                    });

                    it('should throw an error when passing null', function() {

                        callValidateWithOneArgAndOneRule(null, rule)
                                .should.throwError(/invalid/i);
                    });

                    it('should throw an error when passing an ' +
                            'empty string', function() {

                        callValidateWithOneArgAndOneRule('', rule)
                                .should.throwError(/invalid/i);
                    });

                });
            });
        });
    });
});


var callValidateWithOneArgAndOneRule = function(arg, rule) {

    var args = arguments;

    return function() {
        mt.validate(args, rule);
    };
};

