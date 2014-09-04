"use strict";

var IS_SETTER_REGEX = /^set/;

/**
 * Create an class instance that doesn't have any setter methods
 *
 * @param {object} proxyTo
 * @constructor
 */
function GetterProxy(proxyTo) {
  var proxy = {};

  for (var fnName in proxyTo) {
    if (typeof proxyTo[fnName] === 'function' && !IS_SETTER_REGEX.test(fnName)) {
      proxy[fnName] = proxyTo[fnName].bind(proxyTo);
    }
  }

  return proxy;
}

module.exports = GetterProxy;