"use strict";

var React = require('react');
var GoogleMaps = require('../GoogleMapsAPI');

/**
 * Checks whether a prop provides a `GoogleMaps.LatLng`
 */
exports.LatLng = React.PropTypes.instanceOf(GoogleMaps.LatLng);

/**
 * Checks whether a prop provides a `GoogleMaps.LatLngBounds`
 */
exports.LatLngBounds = React.PropTypes.instanceOf(GoogleMaps.LatLngBounds);

/**
 * Checks whether a prop provides a `GoogleMaps.Map`
 */
exports.Map = React.PropTypes.instanceOf(GoogleMaps.Map);

/**
 * Checks whether a prop provides a `GoogleMaps.Point`
 */
exports.Point = React.PropTypes.instanceOf(GoogleMaps.Point);

/**
 * Checks whether a prop provides a `GoogleMaps.Animation`
 */
exports.Animation = React.PropTypes.oneOf(
  Object.keys(GoogleMaps.Animation)
    .map(function(key) {return GoogleMaps.Animation[key];})
);

/**
 * Checks whether a prop provides a `GoogleMaps.Icon`
 */
exports.Icon = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.Symbol`
 */
exports.Symbol = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.MarkerShape`
 */
exports.MarkerShape = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.MapPanes`
 */
exports.MapPanes = React.PropTypes.oneOf(['floatPane', 'mapPane', 'markerLayer', 'overlayLayer', 'overlayMouseTarget']);