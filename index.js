var assert = require('simple-assert');

// find value of nested key inside obj, like:
//
//    var getProp = require('getsetprop');
//    getProp({ a: { b: { c: 'value' } } }, 'a.b.c') === 'value'
//
// set value of nested key inside obj, like:
//
//    var setProp = require('getsetprop');
//    obj = { a: { b: { c: 'value' } } };
//    setProp(obj, 'a.b.c', 'lol');
//    obj.a.b.c === 'lol'
//
function accessor(obj, key, value) {
  assert('string' === typeof key, 'Key to accessor needs to be string');
  assert('object' === typeof obj, 'Need object to find value from');

  // get key parts
  var parts = key.split('.'),
      i = 0,
      result = obj;

  // return base object for empty key getters
  if (!key && value == null) return obj;

  while (i < parts.length) {
    // if setter mode and reached end of key, set value
    if (value != null && i === parts.length - 1) {
      result[parts[i]] = value;
    }

    result = result[parts[i]];

    // for both getters and setters,
    // return undefined if end of key is unreachable
    if (result == null) return undefined;
    i += 1;
  }

  // if reached to end of key, return final value
  return result;
}

accessor.get = accessor.set = accessor;
module.exports = accessor;

