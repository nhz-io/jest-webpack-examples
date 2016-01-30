jest.dontMock('../Example.jsx');
import React from 'react';
import TestUtils from 'react-addons-test-utils';
const Example = require('../Example.jsx').default; // This hack is to import ES6

describe('example', function() {
  it('should be a Component', function() {
    TestUtils.renderIntoDocument(<Example/>);
  });
});
