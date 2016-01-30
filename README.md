# jest-webpack-examples

[![Build Status][travis-image]][travis-url]
[![Coverage][coverage-image]][coverage-url]

## Examples

* [Alias example](examples/alias)
* [Non-Javascript dependencies example](examples/non-js-deps)
* [JSX Example](examples/jsx)

## Problems with ES6 imports

### Consider the case:

File `a.es6`
```javascript
export default class A {};
```

File `b.es6`
```javascript
import A from './a.es6';
export default class B extends A {};
```

File `c.es6`
```javascript
import B from './b.es6';
export default class C extends B {};
```
### This will break:
File `__tests__/c.es6`
```javascript
jest.dontMock('../c.es6');
const C = require('../c.es6').default; //import C from '../c.es6' will not work
```

Jest can't mock ES6 exports, so the solution is either to `jest.dontMock()`  
each of the involved imports (recursively) or create custom `__mocks__` per each file.  

### This will work: 
File `__tests__/c.es6`
```javascript
jest.dontMock('../c.es6');
jest.dontMock('../b.es6');
jest.dontMock('../a.es6');
const C = require('../c.es6').default;
```

### This will also work:
File `__mocks__/a.es6`
```javascript
jest.dontMock('../a.es6');
module.exports = require('../a.es6').default;
```

File `__mocks__/b.es6`
```javascript
jest.dontMock('../b.es6');
module.exports = require('../b.es6').default;
```

File `__tests__/c.es6`
```javascript
jest.dontMock('../c.es6');
const C = require('../c.es6').default;
```

## Problems with coverage

`jest --coverage` will miss sources unless the tests explicitly dontMock() them and use the ES6 import workaround.

### This will pass the test but miss coverage:
File `a.es6`
```javascript
export default 'test';
```

File `__mocks__/a.es6`
```javascript
jest.dontMock('../a.es6')
module.exports = require('../a.es6').default;
```

File `__tests__/a.es6`
```javascript
import a from '../a.es6';
describe('a', function() {
  it('should be equal to "test"', function() {
    expect(a).toBe('test');
  });
});
```

The `import` will work because of the custom mock but coverage will be missing

### This will pass the test and will be covered:

File `a.es6`
```javascript
export default 'test';
```

File `__tests__/a.es6`
```javascript
jest.dontMock('../a.es6');
const a = require('../a.es6').default;
describe('a', function() {
  it('should be equal to "test"', function() {
    expect(a).toBe('test');
  });
});
```

## Test
```
git clone https://github.com/nhz-io/jest-webpack-examples.git
cd jest-webpack-examples
npm install
npm test
```

## LICENSE

### [MIT](LICENSE)

## VERSION

### 1.0.0

[travis-image]: https://travis-ci.org/nhz-io/jest-webpack-examples.svg
[travis-url]: https://travis-ci.org/nhz-io/jest-webpack-examples

[coverage-image]: https://coveralls.io/repos/github/nhz-io/jest-webpack-examples/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/nhz-io/jest-webpack-examples?branch=master
