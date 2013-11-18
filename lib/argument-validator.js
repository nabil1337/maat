/**
 * @constructor
 *
 * @param {Mixed} arg The argument to validate
 * @param {Array} rule The rule to validate against
 */
var ArgumentValidator = function(arg, rule)
{
    this.arg         = arg;
    this.rule        = rule;
};

ArgumentValidator.prototype.getProps = function()
{
    var allowedTypes   = extractAllowedTypesFromRule(this.rule);

    return {
        hasAllowedType : hasArgAllowedType(this.arg, allowedTypes),
        hasValue       : (null !== this.arg && 'undefined' !== typeof this.arg),
        mayBeEmpty     : !doesRuleSay('notEmpty', this.rule),
        mayBeNull      : !doesRuleSay('notNull', this.rule),
        mayBeNaN       : !doesRuleSay('notNaN', this.rule),
        isEmpty        : isArgEmpty(this.arg),
        isNaN          : isNaN(this.arg),
        isNull         : this.arg === null,
        isOptional     : doesRuleSay('optional', this.rule),
        isUndefined    : ('undefined' === typeof this.arg) ? true : false
    };
};

/**
 * Calculates wether the given argument is valid, considering the given rule.
 *
 * @returns {Boolean}
 */
ArgumentValidator.prototype.isValid = function() {

    var props = this.getProps();

    if (
            isFailingOptionalCheck(props) ||

            isFailingNullCheck(props) ||

            isFailingEmptyCheck(props) ||

            isFailingTypeCheck(props) ||

            isFailingNaNCheck(props)
        ) {

        return false;
    }

    return true;
};

var isFailingOptionalCheck = function(props) {

    return (props.isUndefined && !props.isOptional);
};

var isFailingNullCheck = function(props) {

    return (props.isNull && !props.mayBeNull);
};

var isFailingEmptyCheck = function(props) {

    return (props.isEmpty && !props.mayBeEmpty &&
                    !(props.isOptional && props.isUndefined));
};

var isFailingTypeCheck = function(props) {

    return (!props.hasAllowedType && props.hasValue);
};

var isFailingNaNCheck = function(props) {

    return (props.isNaN && !props.mayBeNaN);
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


module.exports = ArgumentValidator;
