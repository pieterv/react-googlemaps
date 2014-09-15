"use strict";

var ReactMapComponents = require('../ReactMapComponents');
var MapOption = require('./MapOption');
var MapEvent = require('./MapEvent');
var MapOptionConfig = require('./MapOptionConfig');
var ReactMap = require('./components/ReactMap');
var ReactOverlayView = require('./components/ReactOverlayView');
var ReactFrag = require('./components/ReactFrag');
var SimpleEventPlugin = require('../eventPlugins/SimpleEventPlugin');
var MouseEventPlugin = require('../eventPlugins/MouseEventPlugin');
var SideEffectEventPlugin = require('../eventPlugins/SideEffectEventPlugin');

var ReactInjection = {
  EventEmitter: null,
  MapEvent: MapEvent.injection,
  MapOption: MapOption.injection,
  MapComponents: ReactMapComponents.injection
};

function inject() {
  ReactInjection.MapEvent.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin,
    MouseEventPlugin: MouseEventPlugin,
    SideEffectEventPlugin: SideEffectEventPlugin
  });

  ReactInjection.MapComponents.injectComponentClasses({
    Map: ReactMap,
    OverlayView: ReactOverlayView,
    Frag: ReactFrag
  });

  ReactInjection.MapOption.injectMapOptionConfig(MapOptionConfig);
}

module.exports = {
  inject: inject
};
