
jest.dontMock('../ReactMapComponent');
jest.mock('react');

describe('ReactMapComponent', function() {
  describe('create', function() {
    it('should return result of React.createClass', function() {
      var ReactMapComponent = require('../ReactMapComponent');
      var ReactMapComponentMixin = require('../ReactMapComponentMixin');
      var React = require('react');

      var createReturn = {};
      React.createClass.mockReturnValue(createReturn);

      var component = ReactMapComponent.create('Map');

      expect(React.createClass).toBeCalled();
      expect(component).toBe(createReturn);

      var spec = React.createClass.mock.calls[0][0];
      expect(spec.mixins[0]).toBe(ReactMapComponentMixin);
      expect(spec.mixins.length).toBe(1);
    });

    it('should add default render function', function() {
      var ReactMapComponent = require('../ReactMapComponent');
      var React = require('react');

      ReactMapComponent.create('Map');

      var spec = React.createClass.mock.calls[0][0];
      expect(spec.render).toEqual(jasmine.any(Function));
    });
  });
});