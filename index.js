var assert = require('simple-assert');

function accessor(obj, path, value) {
  assert('object' === typeof obj, 'Need object to find value from');

  var result = obj;
  if ('string' === typeof path) {
    // get components of string path
    var parts = path.split('.');
    var i = 0;

    // return base object for empty paths
    if (!path && value === undefined) { return obj; }

    while (i < parts.length) {
      // if setter mode and reached end of path, set value
      if (value !== undefined && i === parts.length - 1) {
        // if value is also an object path to a nested value
        // then access the deeper path and set nested value there
        // else set the value at the string path
        if ('object' === typeof value) {
          return accessor(result[parts[i]], value);
        } else {
          result[parts[i]] = value;
        }
      }

      result = result[parts[i]];

      // for both getters and setters,
      // return undefined if end of path is unreachable
      if (result === undefined) { return undefined; }
      i += 1;
    }
  } else if ('object' === typeof path) {
    assert(value === undefined,
      'with object paths, no separate value is needed for setter');
    for (var key in path) {
      if (path.hasOwnProperty(key)) {
        accessor(obj, key, path[key]);
      }
    }
  } else {
    assert.fail('path to access must be string/object', path);
  }

  // if reached to end of path, return final value
  return result;
}

exports.get = function(obj, path, value) {
  assert(value === undefined, 'Cannot set value from getter');
  assert('object' !== typeof path, 'Cannot use object as path for getter');
  return accessor(obj, path);
};

exports.set = function(obj, path, value) {
  if ('object' !== typeof path) {
    assert(value !== undefined, 'Need value to set, or use path object');
  }
  return accessor(obj, path, value);
};

