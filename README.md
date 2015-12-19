# getsetprop
Deeply nested object property getter and setter for JavaScript

# Usage

## Getter

Suppose:

    var get = require('getsetprop').get;

#### Gets nested value from string paths

    var obj = { a: { b: { c: 'value' } } };
    assert(get(obj, 'a.b.c') === 'value');

#### Does not allow 3rd argument (value)

    var obj = { a: { b: { c: 'value' } } };
    try {
      get(obj, 'a.b.c', 'val');
    } catch(e) {
      done();
    }

#### Does not allow object paths

    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    try {
      get(obj, { a: { b: 'c' } });
    } catch (e) {
      done();
    }

## Setter

Suppose:

    var set = require('getsetprop').set;

#### Sets value for nested object by string path

    var obj = { a: { b: { c: 'value' } } };
    set(obj, 'a.b.c', 'lol');
    assert(obj.a.b.c === 'lol');

#### Requires value to be set

    var obj = { a: { b: { c: 'value' } } };
    try {
      set(obj, 'a.b.c', undefined);
    } catch(e) {
      done();
    }

#### Allows undefined value with path objects

    var obj = { a: { b: { c: 'value' } } };
    set(obj, { a: { b: { c: 'lol' } } });
    assert(obj.a.b.c === 'lol');

#### Does not allow defined value for path objects

    var obj = { a: { b: { c: 'value' } } };
    try {
      set(obj, { a: { b: 'c' } }, 'haha');
    } catch(e) {
      done();
    }

#### Can set primitives as value in place of objects

    var obj = { a: { b: { c: 'value' } } };
    set(obj, { a: { b: 'lol' } });
    assert(obj.a.b === 'lol');

#### Sets nested value via path object

    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    set(obj, { a: { b: { c: 'lol' } } });
    assert(obj.a.b.c === 'lol');
    assert(obj.a.b.d === 'haha');

#### Maintains object references, only changing value

    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    var b = obj.a.b;
    var path = { a: { b: { c: 'lol' } } };
    set(obj, path);
    assert(obj.a.b === b);

#### Sets nested value via value object

    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    set(obj, 'a', { b: { c: 'lol' } });
    assert(obj.a.b.c === 'lol');
    assert(obj.a.b.d === 'haha');

#### Allows mixing path object and value object

    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    set(obj, 'a.b', { c: 'lol' });
    assert(obj.a.b.c === 'lol');
    assert(obj.a.b.d === 'haha');

