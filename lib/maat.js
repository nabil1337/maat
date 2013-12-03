var ArgumentValidator = require('./argument-validator');

/**
 * Maat
 */
var Maat = function()
{
    this.rulesList        = null;
    this.args             = null;
    this.customRules = {};
};

/**
 * This method validates a passed arguments object against passed rules.
 *
 * @param {String} [name] The function name to reference if validation fails
 * @param {Object} args The arguments object of the function
 * @param {Array} paramN An array with rules for a single parameter
 */
Maat.prototype.validate = function(name, args) {

    checkArguments(arguments);

    this.args       = ('string' !== typeof arguments[0]) ?
            arguments[0] : arguments[1];

    this.rulesList  = extractRuleLists(arguments);
    this.callerName = getCallerName(arguments);

    this.validateAllArgs();
};

/**
 * Add a custom rule to validate against.
 *
 * @param {String} name The name used to reference the rule
 * @param {Function} validator A function which accepts a single param and
 * returns true if the check passes and false otherwise
 */
Maat.prototype.defineRule = function(name, validator) {

    if ('function' !== typeof validator) {

        throw new Error('Invalid validator function passed');
    }

    if ('string' !== typeof name || name === '') {

        throw new Error('Invalid rule name specified');
    }

    this.customRules[name] = validator;
};

Maat.prototype.validateAllArgs = function()
{
    for (var i = 0; i < this.rulesList.length; i++) {

        try{
            validateSingleArgByRules(this.args[i], this.rulesList[i],
                    this.customRules);
        } catch (e) {

            if ('MissingCustomRule' === e.type) {

                throw new Error(e.message);
            } else if (e.type === 'InvalidArgument') {

                throw new Error(this.callerName + ' Invalid argument at ' +
                        'position ' + (i + 1));
            }

            throw new Error(e.message);
        }
    }
};

var validateSingleArgByRules = function(arg, rules, customRules)
{
    var isValid = (new ArgumentValidator(arg, rules, customRules)).isValid();

    if (!isValid) {
        var e = new Error();
        e.type = 'InvalidArgument';

        throw e;
    }
};

var checkArguments = function(myArguments) {

    var isFirstParamString   = isFirstElemString(myArguments);
    var isFirstParamArgsObj  = isArgumentsObject(myArguments[0]);
    var isSecondParamArgsObj = isArgumentsObject(myArguments[1]);
    var indexOfFirstRules    = isFirstParamArgsObj ? 1 : 2;
    var areFirstRulesValid     = Array.isArray(myArguments[indexOfFirstRules]);

    if ((!isFirstParamString && !isFirstParamArgsObj) ||
            (isFirstParamString && !isSecondParamArgsObj)) {
        throw new Error('Can\'t validate because of missing arguments object');
    }

    if (!areFirstRulesValid) {
        throw new Error('Can\'t validate because of unspecified or wrong rules');
    }
};

var isFirstElemString = function(arr) {
    return 'string' === typeof arr[0];
};

var isArgumentsObject = function(args) {

    return ('object' === typeof args && 'number' === typeof args.length &&
        !Array.isArray(args));
};

var extractRuleLists = function(args) {

    var ruleListsStartAt = isFirstElemString(args) ? 2 : 1;

    return Array.prototype.slice.call(args, ruleListsStartAt);
};

var getCallerName = function(args) {

    var name = ('string' === typeof args[0]) ? args[0] :
            (args.callee.caller.name || 'Anonymous function');

    return '[' + name + ']';
};

module.exports = Maat;
