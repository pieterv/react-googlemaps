"use strict";

var invariant = require('react/lib/invariant');

var MapOptionInjection = {

  /**
   * Inject some specialized knowledge about the GoogleMaps. This takes a config object
   * with the following properties:
   *
   * Options: object mapping Map option name to a React.PropType validator. If your option
   * isn't in here, it won't get passed to your Map class.
   *
   * MapOptionNames: object mapping React attribute name to the Map
   * option name.
   *
   * @param {object} mapOptionConfig the config as described above.
   */
  injectMapOptionConfig: function(mapOptionConfig) {
    var Options = mapOptionConfig.Options || {};
    var MapOptionNames = mapOptionConfig.MapOptionNames || {};

    for (var propName in Options) {
      invariant(
        !MapOption.isStandardName.hasOwnProperty(propName),
        'injectMapOptionConfig(...): You\'re trying to inject DOM property ' +
        '\'%s\' which has already been injected. You may be accidentally ' +
        'injecting the same DOM property config twice, or you may be ' +
        'injecting two configs that have conflicting property names.',
        propName
      );

      MapOption.isStandardName[propName] = true;

      MapOption.getOptionName[propName] =
        MapOptionNames.hasOwnProperty(propName) ?
          MapOptionNames[propName] :
          propName;
    }
  }
};

/**
 * MapOption exports lookup objects that can be used like functions:
 *
 *   > MapOption.isValid['id']
 *   true
 *   > MapOption.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var MapOption = {

  /**
   * Checks whether a option name is a standard option.
   * @type {Object}
   */
  isStandardName: {},

  /**
   * Mapping from normalized names to option on Map class instances.
   * @type {Object}
   */
  getOptionName: {},

  injection: MapOptionInjection
};

module.exports = MapOption;
