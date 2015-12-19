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

    it('gets nested value from arrays via string paths', function() {
      var obj = [{ a: 1 }, { b: { c: 'value' } }];
      assert(get(obj, '0.a') === 1);
      assert(get(obj, '1.b.c') === 'value');
    });
  });

  describe('.set()', function () {
    it('sets value for nested object by string path', function () {
      var obj = { a: { b: { c: 'value' } } };
      set(obj, 'a.b.c', 'lol');
      assert(obj.a.b.c === 'lol');
    });

    it('sets value in arrays via string path', function () {
      var obj = [{ a: 1 }, { b: { c: 'value', d: 'haha' } }];
      set(obj, '0.a', 2);
      assert(obj[0].a === 2);

      set(obj, '1.b.c', 'lol');
      assert(obj[1].b.c === 'lol');
      assert(obj[1].b.d === 'haha');
    });

    it('requires value to be set', function (done) {
      var obj = { a: { b: { c: 'value' } } };
      try {
        set(obj, 'a.b.c', undefined);
      } catch(e) {
        done();
      }
    });

    it('sets nested value via object paths', function () {
      var obj = { a: { b: { c: 'value' } } };
      set(obj, { a: { b: { c: 'lol' } } });
      assert(obj.a.b.c === 'lol');
    });

    it('sets nested value in array via object paths', function () {
      var obj = [{ a: 1 }, { b: { c: 'value' } }];
      set(obj, [{ a: 2}, { b: { c: 'lol' } }]);
      assert(obj[0].a === 2);
      assert(obj[1].b.c === 'lol');
    });

    it('does not allow value with object paths', function (done) {
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

    it('sets nested value via object value', function () {
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

