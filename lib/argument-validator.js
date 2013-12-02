/**
 * @constructor
 *
 * @param {Mixed} arg The argument to validate
 * @param {Array} ruleList The rule list to validate against
 */
var ArgumentValidator = function(arg, ruleList, customRules)
{
    this.arg         = arg;
    this.ruleList    = ruleList;
    this.customRules = customRules;
};

ArgumentValidator.prototype.getProps = function()
{
    var allowedTypes   = extractAllowedTypesFromRule(this.ruleList);

    return {
        customRules    : extractCustomRules(this.ruleList),
        hasAllowedType : hasArgAllowedType(this.arg, allowedTypes),
        hasValue       : (null !== this.arg && 'undefined' !== typeof this.arg),
        mayBeEmpty     : !doesRuleSay('notEmpty', this.ruleList),
        mayBeNull      : !doesRuleSay('notNull', this.ruleList),
        mayBeNaN       : !doesRuleSay('notNaN', this.ruleList),
        isEmpty        : isArgEmpty(this.arg),
        isNaN          : isNaN(this.arg),
        isNull         : this.arg === null,
        isOptional     : doesRuleSay('optional', this.ruleList),
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

            isFailingNaNCheck(props) ||

            this.isFailingCustomRule(props)
        ) {

        return false;
    }

    return true;
};

ArgumentValidator.prototype.isFailingCustomRule = function(props)
{
    var rules     = props.customRules;
    var isFailing = false;
    var self      = this;

    rules.forEach(function(el) {

        if(!self.isArgPassingSingleCustomRule(el)) {

            isFailing = true;
        }
    });

    return isFailing;
};

ArgumentValidator.prototype.isArgPassingSingleCustomRule = function(rule)
{
    if (!this.customRules || !this.customRules[rule]) {

        var e  = new Error('Can\'t find a definition for the custom rule ' +
                rule);

        e.type = 'MissingCustomRule';

        throw e;
    }

    return ('function' === typeof this.customRules[rule] &&
            this.customRules[rule](this.arg)) || false;
};

var extractCustomRules = function(ruleList) {

    var customRules = [];

    ruleList.forEach(function(el) {

        if (el !== 'notNull' && el !== 'notEmpty' && el !== 'optional' &&
                el !== 'object' && el !== 'array' && el !== 'number' &&
                el !== 'string' && el !== 'notNaN') {

            customRules.push(el);
        }
    });

    return customRules;
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
