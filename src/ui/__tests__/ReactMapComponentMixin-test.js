/** @jsx React.DOM */

jest.dontMock('../ReactMapComponentMixin');

describe('ReactMapComponentMixin', function() {
  describe('Sync events', function() {
    it('should remove and add events', function() {
      var GoogleMapsReactComponentMixin = require('../ReactMapComponentMixin');
      var GoogleMapsAPI = require('../../GoogleMapsAPI');
      var MapEvent = require('../MapEvent');

      var noop = jest.genMockFn();
      var instance = Object.create(GoogleMapsReactComponentMixin);
      MapEvent.isStandardName = {
        event1: true,
        event2: true,
        event3: true
      };
      MapEvent.getEventName = {
        event1: 'googleMapsEvent1',
        event2: 'googleMapsEvent2',
        event3: 'googleMapsEvent3'
      };
      MapEvent.createEventDispatcher.mockReturnValue(noop);
      instance.__node = new GoogleMapsAPI.Map();
      instance.__dirtyOptions = {};
      var cachedEvent = {};
      instance.__eventCache = {
        event1: cachedEvent,
        event2: {}
      };

      var prevProps = {
        event1: noop,
        event2: noop
      };
      var props = {
        event2: noop,
        event3: noop
      };

      instance.props = props;
      instance._updateMapProperties(prevProps);

      expect(GoogleMapsAPI.event.removeListener.mock.calls.length).toBe(1);
      expect(GoogleMapsAPI.event.removeListener).toBeCalledWith(cachedEvent);
      expect(instance.__eventCache.event1).toBeUndefined();

      expect(GoogleMapsAPI.event.addListener.mock.calls.length).toBe(1);
      expect(GoogleMapsAPI.event.addListener).toBeCalledWith(instance.__node, MapEvent.getEventName.event3, jasmine.any(Function));
      expect(instance.__eventCache.event3).toBeDefined();
    });
  });
});