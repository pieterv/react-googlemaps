/** @jsx React.DOM */

jest.dontMock('../ReactMapComponentMixin');

describe('ReactMapComponentMixin', function() {
  describe('Events', function() {
    var Component;
    var node;

    beforeEach(function() {
      var ReactMapComponentMixin = require('../ReactMapComponentMixin');
      var MapEvent = require('../MapEvent');
      var React = require('react');

      node = {
        setOptions: jest.genMockFn()
      };

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
      MapEvent.createEventDispatcher.mockReturnValue(jest.genMockFn());

      Component = React.createClass({
        mixins: [ReactMapComponentMixin],
        constructGoogleMapsClass: jest.genMockFn().mockReturnValue(node),
        render: function() {return null}
      });
    });

    it('should add all events on mount', function() {
      var GoogleMapsAPI = require('../../GoogleMapsAPI');
      var ReactTestUtils = require('react/lib/ReactTestUtils');
      var noop = jest.genMockFn();

      ReactTestUtils.renderIntoDocument(
        <Component
          event1={noop}
          event2={noop}
          notEvent={noop} />
      );

      expect(GoogleMapsAPI.event.addListener.mock.calls.length).toBe(2);
      expect(GoogleMapsAPI.event.addListener).toBeCalledWith(node, 'googleMapsEvent1', jasmine.any(Function));
      expect(GoogleMapsAPI.event.addListener).toBeCalledWith(node, 'googleMapsEvent2', jasmine.any(Function));
    });

    it('should add new events on update', function() {
      var React = require('react');
      var GoogleMapsAPI = require('../../GoogleMapsAPI');
      var noop = jest.genMockFn();

      var container = document.createElement('div');
      React.renderComponent(
        <Component
          event1={noop}
          notEvent={noop} />,
        container
      );

      GoogleMapsAPI.event.addListener.mockClear();
      React.renderComponent(
        <Component
          event1={noop}
          event2={noop} />,
        container
      );

      expect(GoogleMapsAPI.event.addListener.mock.calls.length).toBe(1);
      expect(GoogleMapsAPI.event.addListener).toBeCalledWith(node, 'googleMapsEvent2', jasmine.any(Function));
    });

    it('should remove old events on update', function() {
      var React = require('react');
      var GoogleMapsAPI = require('../../GoogleMapsAPI');
      var noop = jest.genMockFn();
      var EventReturn = {};
      GoogleMapsAPI.event.addListener.mockReturnValue(EventReturn);

      var container = document.createElement('div');
      React.renderComponent(
        <Component
          event1={noop}
          event2={noop}
          notEvent={noop} />,
        container
      );

      GoogleMapsAPI.event.removeListener.mockClear();
      React.renderComponent(
        <Component
          event1={noop} />,
        container
      );

      expect(GoogleMapsAPI.event.removeListener.mock.calls.length).toBe(1);
      expect(GoogleMapsAPI.event.removeListener).toBeCalledWith(EventReturn);
      GoogleMapsAPI.event.removeListener.mockClear();
    });

    it('should remove all events on unmount', function() {
      var React = require('react');
      var GoogleMapsAPI = require('../../GoogleMapsAPI');
      var noop = jest.genMockFn();
      var EventReturn = {};
      GoogleMapsAPI.event.addListener.mockReturnValue(EventReturn);

      var container = document.createElement('div');
      React.renderComponent(
        <Component
          event1={noop}
          event2={noop}
          notEvent={noop} />,
        container
      );

      React.unmountComponentAtNode(container);

      expect(GoogleMapsAPI.event.removeListener.mock.calls.length).toBe(2);
      expect(GoogleMapsAPI.event.removeListener).toBeCalledWith(EventReturn);
    });
  });
});