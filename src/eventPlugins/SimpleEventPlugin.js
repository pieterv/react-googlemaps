"use strict";

var eventTypes = {
  onIdle: {
    name: 'idle'
  },
  onResize: {
    name: 'resize'
  },
  onTilesLoaded: {
    name: 'tilesloaded'
  },
  onProjectionChange: {
    name: 'projection_changed'
  },
  onFlatChange: {
    name: 'flat_changed'
  }
};

var SimpleEventPlugin = {

  eventTypes: eventTypes,

  executeDispatch: function(event, eventName, instance) {
    var listener = instance.props[eventName];

    return listener(instance.getMapNode());
  }
};

module.exports = SimpleEventPlugin;
