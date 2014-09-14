"use strict";

var eventTypes = {
  onClick: {
    name: 'click'
  },
  onDoubleClick: {
    name: 'dblclick'
  },
  onDrag: {
    name: 'drag'
  },
  onDragEnd: {
    name: 'dragend'
  },
  onDragStart: {
    name: 'dragstart'
  },
  onMouseDown: {
    name: 'mousedown'
  },
  onMouseMove: {
    name: 'mousemove'
  },
  onMouseOut: {
    name: 'mouseout'
  },
  onMouseOver: {
    name: 'mouseover'
  },
  onMouseUp: {
    name: 'mouseup'
  },
  onRightClick: {
    name: 'rightclick'
  }
};

var MouseEventPlugin = {

  eventTypes: eventTypes,

  executeDispatch: function(event, eventName, instance) {
    var listener = instance.props[eventName];

    return listener(event, instance.getMapNode());
  }
};

module.exports = MouseEventPlugin;
