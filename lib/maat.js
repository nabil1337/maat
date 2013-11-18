var ArgumentValidator = require('./argument-validator');

/**
 * Maat
 */
var Maat = function()
{
    this.rules = null;
    this.args  = null;
};

/**
 * This method validates a passed arguments object against passed rules.
 *
 * @param {Object} args The arguments object of the function
 * @param {Array} paramN An array with rules for a single parameter
 */
Maat.prototype.validate = function(args) {

    this.resetChangingProps();

    assertValidArgsParam(args);
    assertValidArgumentsObject(arguments);

    this.args       = args;
    this.rules      = extractRules(arguments);
    this.callerName = getCallerName(arguments);

    this.validateAllArgs();
};

Maat.prototype.resetChangingProps = function()
{
    this.rules = null;
    this.args  = null;
};

Maat.prototype.validateAllArgs = function()
{
    for (var i = 0; i < this.rules.length; i++) {

        try{
            validateSingleArgByRule(this.args[i], this.rules[i]);
        } catch (e) {
            throw new Error(this.callerName + ' Invalid argument at position ' + (i + 1));
        }
    }
};

var validateSingleArgByRule = function(arg, rule)
{
    var isValid = (new ArgumentValidator(arg, rule)).isValid();

    if (!isValid) {
        throw new Error('Invalid argument provided');
    }
};

var assertValidArgsParam = function(args) {

    if ('object' !== typeof args || 'number' !== typeof args.length) {
        throw new Error('No arguments object passed');
    }
};

var assertValidArgumentsObject = function(myArguments) {

    if (2 > myArguments.length) {
        throw new Error('No rules to validate against specified');
    }
};

var extractRules = function(args) {

    return Array.prototype.slice.call(args, 1);
};

var getCallerName = function(args) {

    var name = args.callee.caller.name || 'Anonymous function';

    return '[' + name + ']';
};

module.exports = Maat;
