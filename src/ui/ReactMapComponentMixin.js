"use strict";

var merge = require('react/lib/merge');
var invariant = require('react/lib/invariant');
var MapOption = require('./MapOption');
var MapOptionConfig = require('./MapOptionConfig');
var MapEvent = require('./MapEvent');
var GoogleMapsAPI = require('../GoogleMapsAPI');

/**
 * Cached reset map option object
 */
var resetMapOptionObject = {map: null};

/**
 * Empty props cache
 */
var emptyPropsCache = {};

/**
 * Empty function to be provided to event handlers
 */
function noop() {}

/**
 * GoogleMaps React component mixin
 */
var ReactMapComponentMixin = {
  propTypes: merge(MapOptionConfig.Options),

  shouldComponentUpdate: function() {
    return this.__shouldComponentUpdate;
  },

  componentDidMount: function() {
    this.__shouldComponentUpdate = true;
    this.__dirtyOptions = {};
    this.__eventCache = {};
    this.__node = this.constructGoogleMapsClass();
    this._setInitialMapProperties();
    this._updateMapProperties(emptyPropsCache);
  },

  componentDidUpdate: function(prevProps) {
    this._updateMapProperties(prevProps);
  },

  _setInitialMapProperties: function() {
    var initialMapOptions = {};
    var props = this.props;
    for (var propKey in props) {
      var optionName = MapOption.getInitialOptionName[propKey];
      if (!props.hasOwnProperty(propKey) || !optionName) {
        continue;
      }

      initialMapOptions[optionName] = props[propKey];
    }

    this.flushOptionChanges(initialMapOptions);
  },

  _updateMapProperties: function(lastProps) {
    var nextProps = this.props;
    var mapOptionChanges = {};
    var mapEventChanges = {};
    var propKey;

    // Remove any options or events that no longer
    // exist in the new set of props.
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

    // Add any changed options or new events.
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

    // Added check of changed options that have side effect events,
    // if they don't have a handler then add a noop one for this event
    // to trigger the side effect dirty checking.
    for (propKey in mapOptionChanges) {
      var sideEffectEvent = MapEvent.getOptionSideEffectEvent[propKey];
      if (!mapOptionChanges.hasOwnProperty(propKey) || !sideEffectEvent || nextProps[sideEffectEvent]) {
        continue;
      }

      var hasNextProp = nextProps[propKey] != null;
      var hasLastProp = lastProps[propKey] != null;

      if (hasLastProp && !hasNextProp) {
        mapEventChanges[sideEffectEvent] = null;
      } else if (!hasLastProp && hasNextProp) {
        mapEventChanges[sideEffectEvent] = noop;
      }
    }

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

  getMapNode: function() {
    return this.__node;
  }
};

module.exports = ReactMapComponentMixin;