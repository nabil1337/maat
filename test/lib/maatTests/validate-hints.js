var should = require('should');
var path   = require('path');
var root   = path.normalize(__dirname + '/../../../lib');
var Maat   = require(root + '/maat');
var mt     = null;


describe('Maat validate hints', function() {

    before(function() {
        mt = new Maat();
    });

    processMaatValidateHints();
});

function processMaatValidateHints() {

    describe('for a wrong second argument', function() {

        it('should refer to the second argument when throwing an error',
                function() {

            callingValidateWithSecondAndThirdArgumentWrong
                    .should.throwError(/position 2$/i);
        });

        it('should refer to the earliest wrong argument only',
                function() {

            callingValidateWithFirstAndSecondArgumentWrong
                    .should.throwError(/position 1$/);

            callingValidateWithSecondAndThirdArgumentWrong
                    .should.throwError(/position 2$/i);
        });
    });

    describe('for failing validation', function() {

        it('should show the name of the caller function', function() {

            (function() {

                (function meowKitty(param) {

                    mt.validate(arguments, ['array']);
                })('lookAtMeImAString');
            }).should.throwError(/meowKitty/i);
        });

        it('should show the name of the caller method when it was passed as ' +
                'first argument', function() {

            (function() {

                var ExampleClass = function()
                {
                };

                ExampleClass.prototype.giveMe = function() {

                    mt.validate('giveMe', arguments, ['string']);
                };

                var instance = new ExampleClass();

                instance.giveMe();

            }).should.throwError(/giveMe/i);
        });

        it('should show the name "anonymus function" if the caller function ' +
                'has no name', function() {

            (function() {

                (function(param) {

                    mt.validate(arguments, ['array']);
                })('lookAtMeImAString');
            }).should.throwError(/anonymous function/i);
        });
    });
};


var callingValidateWithFirstAndSecondArgumentWrong = function() {

    return (function(param1, param2) {

        mt.validate(arguments,
        ['number'],
        ['number']);
    })('yoo', 'yaa');
};

var callingValidateWithSecondAndThirdArgumentWrong = function() {

    return (function(param1, param2, param3) {

        mt.validate(arguments,
        [],
        ['number'],
        ['number']);
    })('yoo', 'miau', 'miau');
};
