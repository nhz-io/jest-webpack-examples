jest.dontMock('../example.es6');
const example = require('../example.es6').default; // This hack is to import ES6

describe('example', function() {
  it('should be a package.json', function() {
    expect(example.name).toBe('jest-webpack-examples');
  });
});
