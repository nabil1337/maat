var should = require('should');
var path   = require('path');
var root   = path.normalize(__dirname + '/../../../lib');
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
    });
});
