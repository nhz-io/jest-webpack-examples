jest.dontMock('../example.es6');
const example = require('../example.es6').default; // This hack is to import ES6

describe('example', function() {
  it('should have a "style.css"', function() {
    expect(example.style).toBe('mocked style.css');
  });
});
