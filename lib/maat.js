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

    this.args  = args;
    this.rules = extractRulesFromArguments(arguments);

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

        this.validateSingleArgByRule(this.args[i], this.rules[i]);
    }
};

Maat.prototype.validateSingleArgByRule = function(arg, rule)
{
    var allowedTypes   = extractAllowedTypesFromRule(rule);
    var mayBeEmpty     = extractMayBeEmptyFromRule(rule);
    var hasAllowedType = (0 === allowedTypes.length) ? true : false;

    allowedTypes.forEach(function(el) {

        if (el === typeof arg) {
            hasAllowedType = true;
        }
    });

    if (!hasAllowedType || ('' === arg && !mayBeEmpty)) {
        throw new Error('Invalid argument provided');
    }
};

var extractAllowedTypesFromRule = function(rule) {

    var result = [];

    rule.forEach(function(el) {
        if ('string' === el) {
            result.push(el);
        }
    });

    return result;
};

var extractMayBeEmptyFromRule = function(rule) {

    if (-1 !== rule.indexOf('notEmpty')) {
        return false;
    }

    return true;
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

var extractRulesFromArguments = function(args) {
    return Array.prototype.slice.call(args, 1);
};

module.exports = Maat;
