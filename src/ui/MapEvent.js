"use strict";

var invariant = require('react/lib/invariant');

var MapEventInjection = {

  /**
   * Inject some specialized knowledge about the GoogleMaps Events. This takes a object
   * of config objects with the following properties:
   *
   * eventTypes: event config, requires a `name` property is set, this is the name of
   * the googlemaps event name. Also can have and `effects` property.
   *
   * executeDispatch: A function for handling the event dispatch logic.
   *
   * @param {object} injectedNamesToPlugins the config as described above.
   */
  injectEventPluginsByName: function(injectedNamesToPlugins) {
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }

      var PluginModule = injectedNamesToPlugins[pluginName];
      for (var eventName in PluginModule.eventTypes) {
        if (!PluginModule.eventTypes.hasOwnProperty(eventName)) {
          continue;
        }

        invariant(
          !MapEvent.isStandardName[eventName],
          'injectEventPluginsByName(...): Event `%s` has already been defined, ' +
            'an event can only be handled once',
          eventName
        );

        var EventConfig = PluginModule.eventTypes[eventName];

        MapEvent.isStandardName[eventName] = true;
        MapEvent.getEventName[eventName] = EventConfig.name || eventName;
        MapEvent.getDispatcher[eventName] = PluginModule.executeDispatch;
        if (EventConfig.effects) {
          MapEvent.getOptionSideEffectEvent[EventConfig.effects] = eventName;
        }
      }
    }
  }
};

/**
 * MapEvent exports lookup objects that can be used like functions:
 *
 *   > MapEvent.isValid['id']
 *   true
 *   > MapEvent.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var MapEvent = {

  /**
   * Checks whether an event name is a standard event.
   * @type {Object}
   */
  isStandardName: {},

  /**
   * Mapping from side effect options to normalized event names.
   * @type {Object}
   */
  getOptionSideEffectEvent: {},

  /**
   * Mapping from normalized event names to GoogleMaps event name.
   * @type {Object}
   */
  getEventName: {},

  /**
   * Mapping over normalized event names to event dispatchers
   * @type {Object}
   */
  getDispatcher: {},

  createEventDispatcher: function(eventName, instance) {
    var executeDispatch = MapEvent.getDispatcher[eventName];
    return function listener(event) {
      if (!MapEvent.isEnabled) {
        return;
      }

      return executeDispatch(event, eventName, instance);
    }
  },

  isEnabled: true,

  setEnabled: function(enabled) {
    MapEvent.isEnabled = enabled;
  },

  injection: MapEventInjection
};

module.exports = MapEvent;
