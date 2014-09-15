## 0.3.0

- Removed `getNodeInterface` and added `getMapNode` which returns the real internal map class instance rather than an interface.
- Added API docs and more detailed examples.
- Added `Frag` component.

## 0.2.1

- Added reactify to package.json for browserify support.

## 0.2.0

- Expose Map PropType validators.
- Added PropType validators to components.
- Map options are no longer passed to the node constructor and are rather, set directly after construction.
- Bugfix: Force noop handlers for events with side effects, e.g. if prop of `center` is set a handler for `onCenterChange` will internally set which allows the SideEffectEventPlugin to stop a value from being internally modified.
- Added option for setting initial options, e.g. `center` can instead be set as `initialCenter`.

## 0.1.2

- Bugfix: update `OverlayView` when new props are passed.

## 0.1.1

- Added base required propType checks.

## 0.1.0

- Initial release.