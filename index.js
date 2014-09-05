"use strict";

var merge = require('react/lib/merge');
var ReactDefaultInjection = require('./src/ui/ReactDefaultInjection');
var ReactMapComponents = require('./src/ReactMapComponents');
var MapPropTypes = require('./src/ui/MapPropTypes');

ReactDefaultInjection.inject();

module.exports = merge(
  ReactMapComponents,
  {
    PropTypes: MapPropTypes
  }
);