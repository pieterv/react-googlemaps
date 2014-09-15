"use strict";

var mergeInto = require('react/lib/mergeInto');
var mapObject = require('react/lib/mapObject');
var GoogleMapsAPI = require('./GoogleMapsAPI');
var ReactMapComponent = require('./ui/ReactMapComponent');

function createMapComponentClass(constructorFn, constructorName) {
  return ReactMapComponent.create(constructorName, constructorFn);
}

function constructGoogleMapsMapClass() {
  return new GoogleMapsAPI.Map(this.props.mapDiv);
}

/**
 * Creates a mapping from supported GoogleMap classes to `ReactMapComponent` classes.
 *
 * @public
 */
var ReactMapComponents = mapObject({
  Map: constructGoogleMapsMapClass, // NOTE: Injected, see `ReactMap`.
  Marker: null,
  Polyline: null,
  Circle: null,
  Rectangle: null,
  Polygon: null
  // OverlayView: Note: Injected, see `ReactOverlayView`.
  // Frag: Note: Injected, see `ReactFrag`.
}, createMapComponentClass);

var injection = {
  injectComponentClasses: function(componentClasses) {
    mergeInto(ReactMapComponents, componentClasses);
  }
};

ReactMapComponents.injection = injection;

module.exports = ReactMapComponents;
