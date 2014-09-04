"use strict";

var React = require('react');
var CustomPropTypes = require('./MapPropTypes');

var MapOptionConfig = {
  Options: {
    backgroundColor: React.PropTypes.string,
    center: CustomPropTypes.LatLng,
    disableDefaultUI: React.PropTypes.bool,
    disableDoubleClickZoom: React.PropTypes.bool,
    draggable: React.PropTypes.bool,
    draggableCursor: React.PropTypes.string,
    draggingCursor: React.PropTypes.string,
    heading: React.PropTypes.number,
    keyboardShortcuts: React.PropTypes.bool,
    mapMaker: React.PropTypes.bool,
    mapTypeControl: React.PropTypes.bool,
    mapTypeControlOptions: React.PropTypes.object,
    mapTypeId: React.PropTypes.string,
    maxZoom: React.PropTypes.number,
    minZoom: React.PropTypes.number,
    noClear: React.PropTypes.bool,
    overviewMapControl: React.PropTypes.bool,
    overviewMapControlOptions: React.PropTypes.object,
    panControl: React.PropTypes.bool,
    panControlOptions: React.PropTypes.object,
    rotateControl: React.PropTypes.bool,
    rotateControlOptions: React.PropTypes.object,
    scaleControl: React.PropTypes.bool,
    scaleControlOptions: React.PropTypes.object,
    scrollwheel: React.PropTypes.bool,
    streetView: React.PropTypes.object,
    streetViewControl: React.PropTypes.bool,
    streetViewControlOptions: React.PropTypes.object,
    styles: React.PropTypes.array,
    tilt: React.PropTypes.number,
    zoom: React.PropTypes.number,
    zoomControl: React.PropTypes.bool,
    zoomControlOptions: React.PropTypes.object,
    anchorPoint: CustomPropTypes.Point,
    animation: CustomPropTypes.Animation,
    clickable: React.PropTypes.bool,
    crossOnDrag: React.PropTypes.bool,
    cursor: React.PropTypes.string,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      CustomPropTypes.Icon,
      CustomPropTypes.Symbol
    ]),
    map: CustomPropTypes.Map,
    opacity: React.PropTypes.number,
    optimized: React.PropTypes.bool,
    position: CustomPropTypes.LatLng,
    shape: CustomPropTypes.MarkerShape,
    title: React.PropTypes.string,
    visible: React.PropTypes.bool,
    zIndex: React.PropTypes.number,
    editable: React.PropTypes.bool,
    geodesic: React.PropTypes.bool,
    icons: React.PropTypes.array,
    path: React.PropTypes.array,
    strokeColor: React.PropTypes.string,
    strokeOpacity: React.PropTypes.number,
    strokeWeight: React.PropTypes.number,
    fillColor: React.PropTypes.string,
    fillOpacity: React.PropTypes.number,
    paths: React.PropTypes.array,
    strokePosition: React.PropTypes.any,
    bounds: CustomPropTypes.LatLngBounds,
    radius: React.PropTypes.number
  },

  MapOptionNames: {
    // Format:
    // autoCapitalize: 'autocapitalize'
  }
};

module.exports = MapOptionConfig;
