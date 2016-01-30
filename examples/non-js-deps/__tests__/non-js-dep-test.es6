jest.dontMock('../example.es6');
const example = require('../example.es6').default; // This hack is to import ES6

describe('example', function() {
  it('should have a "non-js-dep"', function() {
    expect(example.nonJs).toBe('non-js-dep-mock');
  });
});
