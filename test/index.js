var assert = require('simple-assert');

var get = require('../').get;
var set = require('../').set;

describe('getsetprop', function () {
  describe('.get()', function () {
    it('gets nested value from string paths', function () {
      var obj = { a: { b: { c: 'value' } } };
      assert(get(obj, 'a.b.c') === 'value');
    });

    it('does not allow 3rd argument (value)', function (done) {
      var obj = { a: { b: { c: 'value' } } };
      try {
        get(obj, 'a.b.c', 'val');
      } catch(e) {
        done();
      }
    });

    it('does not allow object paths', function (done) {
      var obj = { a: { b: { c: 'value', d: 'haha' } } };
      try {
        get(obj, { a: { b: 'c' } });
      } catch (e) {
        done();
      }
    });
  });

  describe('.set()', function () {
    it('sets value for nested object by string path', function () {
      var obj = { a: { b: { c: 'value' } } };
      set(obj, 'a.b.c', 'lol');
      assert(obj.a.b.c === 'lol');
    });

    it('requires value to be set', function (done) {
      var obj = { a: { b: { c: 'value' } } };
      try {
        set(obj, 'a.b.c', undefined);
      } catch(e) {
        done();
      }
    });

    it('allows undefined value with object paths', function () {
      var obj = { a: { b: { c: 'value' } } };
      set(obj, { a: { b: { c: 'lol' } } });
      assert(obj.a.b.c === 'lol');
    });

    it('does not allow defined value for object paths', function (done) {
      var obj = { a: { b: { c: 'value' } } };
      try {
        set(obj, { a: { b: 'c' } }, 'haha');
      } catch(e) {
        done();
      }
    });

    it('can set primitives as value in place of objects', function () {
      var obj = { a: { b: { c: 'value' } } };
      set(obj, { a: { b: 'lol' } });
      assert(obj.a.b === 'lol');
    });

    it('sets nested value via object path', function () {
      var obj = { a: { b: { c: 'value', d: 'haha' } } };
      set(obj, { a: { b: { c: 'lol' } } });
      assert(obj.a.b.c === 'lol');
      assert(obj.a.b.d === 'haha');
    });

    it('maintains object references, only changing value', function () {
      var obj = { a: { b: { c: 'value', d: 'haha' } } };
      var b = obj.a.b;
      var path = { a: { b: { c: 'lol' } } };
      set(obj, path);
      assert(obj.a.b === b);
    });

    it('sets nested value via value object', function () {
      var obj = { a: { b: { c: 'value', d: 'haha' } } };
      set(obj, 'a', { b: { c: 'lol' } });
      assert(obj.a.b.c === 'lol');
      assert(obj.a.b.d === 'haha');
    });

    it('allows mixing object path and object value', function () {
      var obj = { a: { b: { c: 'value', d: 'haha' } } };
      set(obj, 'a.b', { c: 'lol' });
      assert(obj.a.b.c === 'lol');
      assert(obj.a.b.d === 'haha');
    });
  });
});

