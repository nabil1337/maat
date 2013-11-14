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

