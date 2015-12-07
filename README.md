# getsetprop
Deeply nested object property getter and setter for JavaScript

# Usage

Find value of nested key inside obj, like:

    var getProp = require('getsetprop');
    getProp({ a: { b: { c: 'value' } } }, 'a.b.c') === 'value'

Set value of nested key inside obj, like:

    var setProp = require('getsetprop');
    obj = { a: { b: { c: 'value' } } };
    setProp(obj, 'a.b.c', 'lol');
    obj.a.b.c === 'lol'

