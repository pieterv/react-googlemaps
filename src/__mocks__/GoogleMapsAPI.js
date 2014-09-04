"use strict";

var keyMirror = require('react/lib/keyMirror');

/**
 * Map
 */
exports.Map = jest.genMockFn()
  .mockImpl(function() {
    return {
      setOptions: jest.genMockFn()
    };
  });

exports.MapTypeId = keyMirror({
  HYBRID: null,
  ROADMAP: null,
  SATELLITE: null,
  TERRAIN: null
});

/**
 * Marker
 */
exports.Marker = jest.genMockFn()
  .mockImpl(function() {
    return {
      setOptions: jest.genMockFn()
    };
  });

/**
 * Animation
 */
exports.Animation = keyMirror({
  BOUNCE: null,
  DROP: null
});

/**
 * Point
 */
exports.Point = jest.genMockFn()
  .mockImpl(function() {
    return {
      equals: jest.genMockFn(),
      x: 0,
      y: 0
    };
  });

/**
 * Icon
 */
exports.Icon = {};

/**
 * Symbol
 */
exports.Symbol = {};

/**
 * MarkerShape
 */
exports.MarkerShape = {};

/**
 * LatLngBounds
 */
exports.LatLngBounds = jest.genMockFn()
  .mockImpl(function() {
    return {
      setOptions: jest.genMockFn(),
      getCenter: jest.genMockFn().mockReturnValue(new exports.LatLng(0, 0))
    };
  });

/**
 * LatLng
 */
exports.LatLng = jest.genMockFn()
  .mockImpl(function() {
    return {
      setOptions: jest.genMockFn()
    };
  });

/**
 * Events
 *
 * https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapsEventListener
 */
exports.event = {
  addListener: jest.genMockFn().mockReturnThis(),
  addListenerOnce: jest.genMockFn().mockReturnThis(),
  removeListener: jest.genMockFn(),
  clearInstanceListeners: jest.genMockFn(),
  clearListeners: jest.genMockFn()
};