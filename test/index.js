var accessor = require('../');
var assert = require('simple-assert');

describe('getsetprop', function () {
  it('works as a getter', function () {
    assert(accessor({ a: { b: { c: 'value' } } }, 'a.b.c') === 'value');
  });

  it('works as a setter', function () {
    var obj = { a: { b: { c: 'value' } } };
    accessor(obj, 'a.b.c', 'lol');
    assert(obj.a.b.c === 'lol');
  });
});

