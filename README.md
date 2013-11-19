maat
====

node.js argument validation made simple

## What?

Are you tired of specifying something like this in your functions?

    function myFunc(lorem, ipsum) {

        if ('undefined' === typeof lorem || null === lorem) {
            throw new Error('First argument has wrong format');
        }

        if ('undefined' !== typeof ipsum && 'object' !== typeof ipsum) {
            throw new Error('If passed, second argument needs to be an object!');
        }

        // your code here
    }

What if we told you, you could use this instead?

    function myFunc(lorem, ipsum) {

        maat.validate(arguments,
            ['notNull'],
            ['optional', 'object']);

        // your code here
    }

No more stupid if statements annoying you - that'd be great, wouldn't it?

Well, actually, that's what maat is about:
Validation finally made simple.

## Usage

You can define a ``rule list`` (which is an array) for each argument.
Rulelists can consist of ``type rules`` and/or ``filter rules``.

### Supported type rules

``array``
``number``
``object``
``string``

### Supported filter rules

``optional`` The specified rules only apply, if an argument is provided
``notNull`` By default, each type allows null. If you don't want to allow null, add ``notNull``
``notEmpty`` This is even stricter than ``notNull`` - it doesn't allow null and the passed parameter may not be empty
``notNaN`` Defines that a ``number`` may not be NaN

### Implications

* If a value has the rule ``notNull``, it may not be null, but may be empty

* If a value has the rule ``notEmpty``, it automatically also behaves like ``notNull`` and in addition may not be empty.

* If a value has the rule ``optional``, it may be undefined OR must match the other defined rules

### Function- and methodnames

If you are calling ``validate`` inside a named function, it will automatically
find the function's name. However, if you call it inside an anonymous function
or a class method, it will only show ``anonymous function`` as a reference on a
failed validation.
To avoid this, simply pass the function-/methodname as first parameter:

    MyClass.prototype.myFunc = function(yourName) {

        mt.validate('myFunc', arguments, ['string', 'notEmpty']);
    };

If some user now calls ``myFunc`` with a wrong type, an exception like the
following will be thrown:

``[myFunc] Invalid argument at position 1``
