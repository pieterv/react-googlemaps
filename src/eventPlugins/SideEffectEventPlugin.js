"use strict";

var SimpleEventPlugin = require('./SimpleEventPlugin');

var eventTypes = {
  onCenterChange: {
    name: 'center_changed',
    effects: 'center'
  },
  onZoomChange: {
    name: 'zoom_changed',
    effects: 'zoom'
  },
  onBoundsChange: {
    name: 'bounds_changed',
    effects: 'bounds'
  },
  onHeadingChange: {
    name: 'heading_changed',
    effects: 'heading'
  },
  onMapTypeIdChange: {
    name: 'maptypeid_changed',
    effects: 'mapTypeId'
  },
  onTiltChange: {
    name: 'tilt_changed',
    effects: 'tilt'
  },
  onAnimationChange: {
    name: 'animation_changed',
    effects: 'animation'
  },
  onClickableChange: {
    name: 'clickable_changed',
    effects: 'clickable'
  },
  onCursorChange: {
    name: 'cursor_changed',
    effects: 'cursor'
  },
  onDraggableChange: {
    name: 'draggable_changed',
    effects: 'draggable'
  },
  onIconChange: {
    name: 'icon_changed',
    effects: 'icon'
  },
  onPositionChange: {
    name: 'position_changed',
    effects: 'position'
  },
  onShapeChange: {
    name: 'shape_changed',
    effects: 'shape'
  },
  onTitleChange: {
    name: 'title_changed',
    effects: 'title'
  },
  onVisibleChange: {
    name: 'visible_changed',
    effects: 'visible'
  },
  onZIndexChange: {
    name: 'zindex_changed',
    effects: 'zindex'
  },
  onRadiusChange: {
    name: 'radius_changed',
    effects: 'radius'
  }
};

var SideEffectEventPlugin = {

  eventTypes: eventTypes,

  executeDispatch: function(event, eventName, instance) {
    var effects = eventTypes[eventName].effects;

    if (instance.props[effects] == null) {
      // The effected property is not set so this event listener
      // only needs to be passive.
      return SimpleEventPlugin.executeDispatch(event, eventName, instance)
    }

    var listener = instance.props[eventName];
    var returnVal;
    if (listener) {
      instance.queueDirtyCheck();
      returnVal = listener(instance.getMapNode());
    }
    instance.flushDirtyChangesTo(effects);

    return returnVal;
  }
};

module.exports = SideEffectEventPlugin;
