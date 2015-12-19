# getsetprop
Deeply nested object property getter and setter for JavaScript

## Signature

#### For Getter
Returns `value` in `object` at specified `path`.

    var get = require('getsetprop').get;
    var value = get(object, path);

#### For Setter

Sets `value` at specified `path` in `object`.

    var set = require('getsetprop').set;
    set(object, path, value);

## Terminology

#### For getter
- `string path`: access path for getters (`'a.b.c'`)

#### For setter
- `primitive value`: primitive value to be set at specified access path
  (`'val'`, `2`, etc.)
- `object path`: access path for setters also containing new value
  (`{ a: { b: 'val' } }`).
- `object value`: object containing both path and value to set
  (`{ a: { b: 'val' } }`)

## Rules

- object paths can only be used in setter
- object paths cannot also specify values (or object values)
- string paths need values in setter
- string paths can be combined with object values to specify further
  path and ultimate primitive value
- cannot set objects as values at the moment (may reconsider this in
  future if sufficient use case found)

## Usage Examples

#### For Getter

- Gets nested value from string paths

    var obj = { a: { b: { c: 'value' } } };
    assert(get(obj, 'a.b.c') === 'value');

- Does not allow 3rd argument (value)

    var obj = { a: { b: { c: 'value' } } };
    try {
      get(obj, 'a.b.c', 'val');
    } catch(e) {
      done();
    }

- Does not allow object paths

    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    try {
      get(obj, { a: { b: 'c' } });
    } catch (e) {
      done();
    }

#### For Setter

- Sets value for nested object by string path

    var obj = { a: { b: { c: 'value' } } };
    set(obj, 'a.b.c', 'lol');
    assert(obj.a.b.c === 'lol');

- Requires value to be set

    var obj = { a: { b: { c: 'value' } } };
    try {
      set(obj, 'a.b.c', undefined);
    } catch(e) {
      done();
    }

- Allows undefined value with object paths

    var obj = { a: { b: { c: 'value' } } };
    set(obj, { a: { b: { c: 'lol' } } });
    assert(obj.a.b.c === 'lol');

- Does not allow defined value for object paths

    var obj = { a: { b: { c: 'value' } } };
    try {
      set(obj, { a: { b: 'c' } }, 'haha');
    } catch(e) {
      done();
    }

- Can set primitives as value in place of objects

    var obj = { a: { b: { c: 'value' } } };
    set(obj, { a: { b: 'lol' } });
    assert(obj.a.b === 'lol');

- Sets nested value via object path

    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    set(obj, { a: { b: { c: 'lol' } } });
    assert(obj.a.b.c === 'lol');
    assert(obj.a.b.d === 'haha');

- Maintains object references, only changing value

    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    var b = obj.a.b;
    var path = { a: { b: { c: 'lol' } } };
    set(obj, path);
    assert(obj.a.b === b);

- Sets nested value via value object

    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    set(obj, 'a', { b: { c: 'lol' } });
    assert(obj.a.b.c === 'lol');
    assert(obj.a.b.d === 'haha');

- Allows mixing object paths and object values

    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    set(obj, 'a.b', { c: 'lol' });
    assert(obj.a.b.c === 'lol');
    assert(obj.a.b.d === 'haha');

