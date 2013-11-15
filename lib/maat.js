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
    var mayNotBeEmpty  = doesRuleSay('notEmpty', rule);
    var mayNotBeNull   = doesRuleSay('notNull', rule);
    var isOptional     = doesRuleSay('optional', rule);
    var isUndefined    = ('undefined' === typeof arg) ? true : false;
    var hasAllowedType = hasArgAllowedType(arg, allowedTypes);
    var isEmpty        = isArgEmpty(arg);

    var isInvalid      = (!hasAllowedType && null !== arg) ||
            (isEmpty && mayNotBeEmpty) ||
            (null === arg && (mayNotBeNull || mayNotBeEmpty)) ||
            isUndefined && !isOptional;

    if (isInvalid) {
        throw new Error('Invalid argument provided');
    }
};

var doesRuleSay = function(what, rule) {

    if (-1 === rule.indexOf(what)) {
        return false;
    }

    return true;
};

var isArgEmpty = function(arg) {

    if (null === arg || '' === arg || 'undefined' === typeof arg) {
        return true;
    }

    if (Array.isArray(arg)) {

        return arg.length === 0;
    } else if ('object' === typeof arg) {

        return Object.keys(arg).length === 0;
    }

    return false;
};

var extractAllowedTypesFromRule = function(rule) {

    var result = [];

    rule.forEach(function(el) {
        if ('string' === el || 'array' === el || 'object' === el ||
                'number' === el) {
            result.push(el);
        }
    });

    return result;
};

var hasArgAllowedType = function(arg, allowedTypes) {

    var hasAllowedType = (0 === allowedTypes.length) ? true : false;

    allowedTypes.forEach(function(el) {

        if (isTypeMatchingArg(el, arg)) {

            hasAllowedType = true;
        }
    });

    return hasAllowedType;
};

var isTypeMatchingArg = function(type, arg) {

    if ('object' === type) {
        if ('object' === typeof arg && !Array.isArray(arg)) {
            return true;
        }

        return false;
    } else if ('array' === type && Array.isArray(arg)) {

        return true;
    } else if (type === typeof arg) {
        
        return true;
    }

    return false;
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
