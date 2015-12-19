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
- `value`: primitive value to be set at specified access path
  (`'val'`, `2`, etc.)
- `object path`: access path for setters also containing new value
  (`{ a: { b: 'val' } }`).
- `object value`: object containing both path and new value
  (`{ a: { b: 'val' } }`)

## Rules

- `object path` can only be used in setter
- `object path` cannot also specify `value` (or `object value`)
- `string path` needs `value` (or `object value`) in setter
- `string path` can be combined with `object value` to specify further
  nested path and new value at final path
- cannot set objects as values at the moment (may reconsider this in
  future if sufficient use case found)

## Usage Examples

#### For Getter

- Gets nested value from `string path`

```
    var obj = { a: { b: { c: 'value' } } };
    assert(get(obj, 'a.b.c') === 'value');
```

- Does not allow 3rd argument (value)

```
    var obj = { a: { b: { c: 'value' } } };
    try {
      get(obj, 'a.b.c', 'val');
    } catch(e) {
      done();
    }
```

- Does not allow `object path`

```
    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    try {
      get(obj, { a: { b: 'c' } });
    } catch (e) {
      done();
    }
```

- Gets nested value from arrays via `string path`

```
    var obj = [{ a: 1 }, { b: { c: 'value' } }];
    assert(get(obj, '0.a') === 1);
    assert(get(obj, '1.b.c') === 'value');
```

#### For Setter

- Sets value for nested object by `string path`

```
    var obj = { a: { b: { c: 'value' } } };
    set(obj, 'a.b.c', 'lol');
    assert(obj.a.b.c === 'lol');
```

- Sets value in arrays via `string path`

```
    var obj = [{ a: 1 }, { b: { c: 'value', d: 'haha' } }];
    set(obj, '0.a', 2);
    assert(obj[0].a === 2);

    set(obj, '1.b.c', 'lol');
    assert(obj[1].b.c === 'lol');
    assert(obj[1].b.d === 'haha');
```

- Requires value to be set

```
    var obj = { a: { b: { c: 'value' } } };
    try {
      set(obj, 'a.b.c', undefined);
    } catch(e) {
      done();
    }
```

- Sets nested value via `object path`

```
    var obj = { a: { b: { c: 'value' } } };
    set(obj, { a: { b: { c: 'lol' } } });
    assert(obj.a.b.c === 'lol');
```

- Does not allow value with `object path`

```
    var obj = { a: { b: { c: 'value' } } };
    try {
      set(obj, { a: { b: 'c' } }, 'haha');
    } catch(e) {
      done();
    }
```

- Can set primitives as value in place of objects

```
    var obj = { a: { b: { c: 'value' } } };
    set(obj, { a: { b: 'lol' } });
    assert(obj.a.b === 'lol');
```

- Sets nested value via `object path`

```
    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    set(obj, { a: { b: { c: 'lol' } } });
    assert(obj.a.b.c === 'lol');
    assert(obj.a.b.d === 'haha');
```

- Sets nested value in array via `object path`

```
    var obj = [{ a: 1 }, { b: { c: 'value' } }];
    set(obj, [{ a: 2}, { b: { c: 'lol' } }]);
    assert(obj[0].a === 2);
    assert(obj[1].b.c === 'lol');
```

- Maintains object references, only changing value

```
    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    var b = obj.a.b;
    var path = { a: { b: { c: 'lol' } } };
    set(obj, path);
    assert(obj.a.b === b);
```

- Sets nested value via `object value`

```
    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    set(obj, 'a', { b: { c: 'lol' } });
    assert(obj.a.b.c === 'lol');
    assert(obj.a.b.d === 'haha');
```

- Allows mixing `object path` and `object value`

```
    var obj = { a: { b: { c: 'value', d: 'haha' } } };
    set(obj, 'a.b', { c: 'lol' });
    assert(obj.a.b.c === 'lol');
    assert(obj.a.b.d === 'haha');
```

