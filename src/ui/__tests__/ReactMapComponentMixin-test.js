/** @jsx React.DOM */

jest.dontMock('../ReactMapComponentMixin');

describe('ReactMapComponentMixin', function() {
  describe('Map Options', function() {
    var Component;
    var node;

    beforeEach(function() {
      var ReactMapComponentMixin = require('../ReactMapComponentMixin');
      var MapOption = require('../MapOption');
      var MapEvent = require('../MapEvent');
      var React = require('react');

      node = {
        setOptions: jest.genMockFn()
      };

      MapOption.isStandardName = {
        option1: true,
        option2: true,
        option3: true,
        map: true
      };

      MapOption.getOptionName = {
        option1: 'option1',
        option2: 'option2',
        option3: 'option3',
        map: 'map'
      };

      Component = React.createClass({
        mixins: [ReactMapComponentMixin],
        constructGoogleMapsClass: jest.genMockFn().mockReturnValue(node),
        render: function() {return null}
      });
    });

    it('should add all options on mount', function() {
      var ReactTestUtils = require('react/lib/ReactTestUtils');
      var noop = jest.genMockFn();

      ReactTestUtils.renderIntoDocument(
        <Component
          option1={noop}
          option2={null}
          option3={'hi'}
          notOption={noop} />
      );

      expect(node.setOptions.mock.calls.length).toBe(1);
      expect(node.setOptions).toBeCalledWith({option1: noop, option2: null, option3: 'hi'});
    });

    it('should add new options on update', function() {
      var React = require('react');
      var noop = jest.genMockFn();

      var container = document.createElement('div');
      React.renderComponent(
        <Component
          option1={noop}
          notOption={noop} />,
        container
      );

      node.setOptions.mockClear();
      React.renderComponent(
        <Component
          option1={noop}
          option2={noop} />,
        container
      );

      expect(node.setOptions.mock.calls.length).toBe(1);
      expect(node.setOptions).toBeCalledWith({option2: noop});
    });

    it('should set changed options on update', function() {
      var React = require('react');
      var noop = jest.genMockFn();
      var noop2 = jest.genMockFn();

      var container = document.createElement('div');
      React.renderComponent(
        <Component
          option1={noop}
          option2={noop}
          notOption={noop} />,
        container
      );

      node.setOptions.mockClear();
      React.renderComponent(
        <Component
          option1={noop2}
          option2={null}
          notOption={noop2} />,
        container
      );

      expect(node.setOptions.mock.calls.length).toBe(1);
      expect(node.setOptions).toBeCalledWith({option1: noop2, option2: null});
    });

    it('should null old options on update', function() {
      var React = require('react');
      var noop = jest.genMockFn();

      var container = document.createElement('div');
      React.renderComponent(
        <Component
          option1={noop}
          option2={noop}
          notOption={noop} />,
        container
      );

      node.setOptions.mockClear();
      React.renderComponent(
        <Component
          option1={noop} />,
        container
      );

      expect(node.setOptions.mock.calls.length).toBe(1);
      expect(node.setOptions).toBeCalledWith({option2: null});
    });

    it('should null `map` option on unmount', function() {
      var React = require('react');

      var map = {};
      var container = document.createElement('div');
      React.renderComponent(
        <Component
          event1={true}
          map={map}
          notEvent={'as'} />,
        container
      );

      node.setOptions.mockClear();
      React.unmountComponentAtNode(container);

      expect(node.setOptions.mock.calls.length).toBe(1);
      expect(node.setOptions).toBeCalledWith({map: null});
    });
  });

  describe('Map Events', function() {
    var Component;
    var node;

    beforeEach(function() {
      var ReactMapComponentMixin = require('../ReactMapComponentMixin');
      var MapOption = require('../MapOption');
      var MapEvent = require('../MapEvent');
      var React = require('react');

      node = {
        setOptions: jest.genMockFn()
      };

      MapOption.isStandardName = {
        sideEffectOption: true
      };
      MapOption.getOptionName = {
        sideEffectOption: 'sideEffectOption'
      };

      MapEvent.isStandardName = {
        event1: true,
        event2: true,
        event3: true,
        sideEffectEvent: true
      };
      MapEvent.getEventName = {
        event1: 'googleMapsEvent1',
        event2: 'googleMapsEvent2',
        event3: 'googleMapsEvent3',
        sideEffectEvent: 'googleMapsEvent4'
      };
      MapEvent.getOptionSideEffectEvent = {
        sideEffectOption: 'sideEffectEvent'
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
          sideEffectOption={true}
          notEvent={noop} />
      );

      expect(GoogleMapsAPI.event.addListener.mock.calls.length).toBe(3);
      expect(GoogleMapsAPI.event.addListener).toBeCalledWith(node, 'googleMapsEvent1', jasmine.any(Function));
      expect(GoogleMapsAPI.event.addListener).toBeCalledWith(node, 'googleMapsEvent2', jasmine.any(Function));
      expect(GoogleMapsAPI.event.addListener).toBeCalledWith(node, 'googleMapsEvent4', jasmine.any(Function));
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
          event2={noop}
          sideEffectOption={true} />,
        container
      );

      expect(GoogleMapsAPI.event.addListener.mock.calls.length).toBe(2);
      expect(GoogleMapsAPI.event.addListener).toBeCalledWith(node, 'googleMapsEvent2', jasmine.any(Function));
      expect(GoogleMapsAPI.event.addListener).toBeCalledWith(node, 'googleMapsEvent4', jasmine.any(Function));
    });

    it('should not change events when side effect option is dirty', function() {
      var React = require('react');
      var GoogleMapsAPI = require('../../GoogleMapsAPI');

      var container = document.createElement('div');
      var instance = React.renderComponent(
        <Component
          sideEffectOption={true} />,
        container
      );

      GoogleMapsAPI.event.addListener.mockClear();

      instance.__dirtyOptions['sideEffectOption'] = true;
      React.renderComponent(
        <Component
          sideEffectOption={true} />,
        container
      );

      expect(GoogleMapsAPI.event.addListener).not.toBeCalled();
      expect(GoogleMapsAPI.event.removeListener).not.toBeCalled();
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
          notEvent={noop}
          sideEffectOption={true} />,
        container
      );

      GoogleMapsAPI.event.removeListener.mockClear();
      React.renderComponent(
        <Component
          event1={noop} />,
        container
      );

      expect(GoogleMapsAPI.event.removeListener.mock.calls.length).toBe(2);
      expect(GoogleMapsAPI.event.removeListener).toBeCalledWith(EventReturn);
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
          notEvent={noop}
          sideEffectOption={true} />,
        container
      );

      React.unmountComponentAtNode(container);

      expect(GoogleMapsAPI.event.removeListener.mock.calls.length).toBe(3);
      expect(GoogleMapsAPI.event.removeListener).toBeCalledWith(EventReturn);
    });
  });
});