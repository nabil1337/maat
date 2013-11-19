var ArgumentValidator = require('./argument-validator');

/**
 * Maat
 */
var Maat = function()
{
    this.rulesList = null;
    this.args      = null;
};

/**
 * This method validates a passed arguments object against passed rules.
 *
 * @param {String} [name] The function name to reference if validation fails
 * @param {Object} args The arguments object of the function
 * @param {Array} paramN An array with rules for a single parameter
 */
Maat.prototype.validate = function(name, args) {

    this.resetChangingProps();

    checkArguments(arguments);

    this.args       = ('string' !== typeof arguments[0]) ?
            arguments[0] : arguments[1];

    this.rulesList  = extractRuleLists(arguments);
    this.callerName = getCallerName(arguments);

    this.validateAllArgs();
};

Maat.prototype.resetChangingProps = function()
{
    this.rulesList = null;
    this.args      = null;
};

Maat.prototype.validateAllArgs = function()
{
    for (var i = 0; i < this.rulesList.length; i++) {

        try{
            validateSingleArgByRules(this.args[i], this.rulesList[i]);
        } catch (e) {
            throw new Error(this.callerName + ' Invalid argument at position ' + (i + 1));
        }
    }
};

var validateSingleArgByRules = function(arg, rules)
{
    var isValid = (new ArgumentValidator(arg, rules)).isValid();

    if (!isValid) {
        throw new Error('Invalid argument provided');
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
