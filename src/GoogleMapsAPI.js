"use strict";

var invariant = require('invariant');

invariant(
  window.google && window.google.maps,
  '`google.maps` global object not found, make sure ' +
    'Google maps in included before react-googlemaps is defined'
);

module.exports = window.google.maps;
