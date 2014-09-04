"use strict";

var invariant = require('react/lib/invariant');
var MapOption = require('./MapOption');
var MapEvent = require('./MapEvent');
var GoogleMapsAPI = require('../GoogleMapsAPI');
var GetterProxy = require('../utils/GetterProxy');

/**
 * Cached reset map option object
 */
var resetMapOptionObject = {map: null};

/**
 * GoogleMaps React component mixin
 */
var ReactMapComponentMixin = {
  shouldComponentUpdate: function() {
    return this.__shouldComponentUpdate;
  },

  componentDidMount: function() {
    this.__shouldComponentUpdate = true;
    this.__dirtyOptions = {};
    this.__eventCache = {};
    this.__node = this.constructGoogleMapsClass(this.props);
    this.__nodeInterface = new GetterProxy(this.__node);
    this.flushEventChanges(MapEvent.extractEventsFromProps(this.props));
  },

  componentDidUpdate: function(prevProps) {
    this._updateMapProperties(prevProps);
  },

  _updateMapProperties: function(lastProps) {
    var nextProps = this.props;
    var mapOptionChanges = {};
    var mapEventChanges = {};

    var propKey;
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) ||
        !lastProps.hasOwnProperty(propKey)) {
        continue;
      }

      if (MapEvent.isStandardName[propKey]) {
        mapEventChanges[propKey] = null;
      } else if (MapOption.isStandardName[propKey]) {
        mapOptionChanges[propKey] = null;
      }
    }

    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = lastProps[propKey];
      if (!nextProps.hasOwnProperty(propKey) ||
        (nextProp === lastProp && !this.__dirtyOptions[propKey])) {
        continue;
      }

      if (MapEvent.isStandardName[propKey] && !lastProp) {
        mapEventChanges[propKey] = nextProp;
      } else if (MapOption.isStandardName[propKey]) {
        mapOptionChanges[MapOption.getOptionName[propKey]] = nextProps[propKey];
      }
    }

    // TODO: Deal with adding noop event listeners to props with side effects

    this.flushOptionChanges(mapOptionChanges);
    this.flushEventChanges(mapEventChanges);
  },

  flushOptionChanges: function(optionChanges) {
    MapEvent.setEnabled(false);
    this.__node.setOptions(optionChanges);
    MapEvent.setEnabled(true);
  },

  flushEventChanges: function(eventChanges) {
    for (var eventName in eventChanges) {
      if (!eventChanges.hasOwnProperty(eventName)) {
        continue;
      }

      if (eventChanges[eventName]) {
        this.putListener(eventName);
      } else {
        this.deleteListener(eventName);
      }
    }
  },

  componentWillUnmount: function() {
    this.deleteAllListeners();

    if (this.props.map) {
      // If we still have a map prop at this point we should unset it from the node
      this.flushOptionChanges(resetMapOptionObject);
    }
    this.__node = null;
    this.__nodeInterface = null;
  },

  putListener: function(eventName) {
    invariant(!this.__eventCache[eventName], 'Already has `%s` event bound', eventName);

    this.__eventCache[eventName] = GoogleMapsAPI.event.addListener(
      this.__node,
      MapEvent.getEventName[eventName],
      MapEvent.createEventDispatcher(eventName, this)
    );
  },

  deleteListener: function(eventName) {
    invariant(this.__eventCache[eventName], 'No event of `%s` bound to remove', eventName);

    GoogleMapsAPI.event.removeListener(this.__eventCache[eventName]);
    delete this.__eventCache[eventName];
  },

  deleteAllListeners: function() {
    for (var eventName in this.__eventCache) {
      if (this.__eventCache.hasOwnProperty(eventName)) {
        this.deleteListener(eventName);
      }
    }
  },

  queueDirtyCheck: function() {
    this.__shouldComponentUpdate = false;
  },

  flushDirtyChangesTo: function(effects) {
    this.__shouldComponentUpdate = true;
    this.__dirtyOptions[effects] = true;
    this.forceUpdate();
    this.__dirtyOptions = {};
  },

  getNodeInterface: function() {
    return this.__nodeInterface;
  }
};

module.exports = ReactMapComponentMixin;