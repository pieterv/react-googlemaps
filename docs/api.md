API
===

- [Components](#components)
  - [`Map`](#map)
  - [`Marker`](#marker)
  - [`Polyline`](#polyline)
  - [`Polygon`](#polygon)
  - [`Circle`](#circle)
  - [`Rectangle`](#rectangle)
  - [`OverlayView`](#overlayview)
  - [`Frag`](#frag)
- [PropTypes](#proptypes)

# Components

```js
var ReactGoogleMaps = require('react-googlemaps');
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;

<Map zoom={...} center={...}>
  <Marker position={...} />
</Map>
```
All components can be referenced from the root `react-googlemaps` object.

```js
var GoogleMapsAPI = window.google.maps;
var LatLng = GoogleMapsAPI.LatLng;

var myPosition = new LatLng(...);
```
Components will often need native GoogleMaps classes as props. For example `LatLng` is often needed for setting the position of components.

### Props
Components have 3 main types of props that can be set:

#### Options

```js
<Map
  zoom={10}
  center={new LatLng(...)} />
```

GoogleMaps options for each component can be set via props. Options available for a particular component can be found within the [GoogleMaps API docs](https://developers.google.com/maps/documentation/javascript/reference), the prop name and type will be the same as listed in the class options section. For example see the [MapOptions section](https://developers.google.com/maps/documentation/javascript/reference#MapOptions).

As is typical with React, these props are immutable so cannot be modified by GoogleMaps or any of its controls, if you want to allow the value to be modified see [initial options](#initial-options) or bind to the associated [change event](#events) and update the option on change.


#### Initial options

```js
<Map
  initialZoom={10}
  initialCenter={new LatLng(...)} />
```

Initial options are options that are only applied during `componentDidMount`, this is useful when you want to allow a value to be changed by GoogleMaps controls over time. For example setting `initialZoom={10}` will allow a user to zoom in and out via the Google Maps zoom controls or double clicking but initialise with a value of `10`.

All possible options can be set as an initial value, with the option names following the convention of: `initialOptionName`.

#### Events

```js
function handleCenterChange(mapNode) {
  var newCenter = mapNode.getCenter();
}

<Map
  {...props}
  onCenterChange={handleCenterChange} />
```

GoogleMaps events for each component can be set via props. Events available for a particular component can be found within the [GoogleMaps API docs](https://developers.google.com/maps/documentation/javascript/reference), the prop name listed in the class events section will follow the convention of `center_changed` becoming `onCenterChange`. For example see the [Map section](https://developers.google.com/maps/documentation/javascript/reference#Map).

### getMapNode()

If this component has been mounted, this returns the corresponding internal GoogleMap class instance. This method is useful for reading values out of the map node, such as the current `LatLng` position. This is the equivalent of React's `getDOMNode()`.

## Map

```js
<Map
  width={500}
  heigh={500}
  initialCenter={new LatLng(...)}
  initialZoom={10}>
  {children}
</Map>
```

[GoogleMaps Map](https://developers.google.com/maps/documentation/javascript/reference#Map) docs.

## Marker

```js
<Marker
  onClick={...}
  position={new LatLng(...)} />
```

[GoogleMaps Marker](https://developers.google.com/maps/documentation/javascript/reference#Marker) docs.

## Polyline

```js
<Polyline
  strokeColor="#000"
  path={[new LatLng(...), new LatLng(...)]} />
```

[GoogleMaps Polyline](https://developers.google.com/maps/documentation/javascript/reference#Polyline) docs.

## Polygon

```js
<Polygon
  strokeColor="#000"
  path={[new LatLng(...), new LatLng(...), new LatLng(...)]} />
```

[GoogleMaps Polygon](https://developers.google.com/maps/documentation/javascript/reference#Polygon) docs.

## Circle

```js
<Circle
  strokeColor="#000"
  center={new LatLng(...)}
  radius={100} />
```

[GoogleMaps Circle](https://developers.google.com/maps/documentation/javascript/reference#Circle) docs.

## Rectangle

```js
<Rectangle
  strokeColor="#000"
  bounds={new LatLngBounds(...)} />
```

[GoogleMaps Rectangle](https://developers.google.com/maps/documentation/javascript/reference#Rectangle) docs.

## OverlayView

```js
<OverlayView
  className="myOverlay"
  mapPane="floatPane"
  position={new LatLng(...)}>
  <h1>Title</h1>
  <p>Some React content</p>
</OverlayView>
```

Uses the GoogleMaps OverlayView to render arbitrary React DOM elements into the map. This component has two special props with all other props being forward to the underlying map `div`.
* `position` - A `LatLng` location at which the view should be positioned.
* `mapPane` - Map pane layer to add the view to. One of the  [`GoogleMapsAPI.MapPanes`](https://developers.google.com/maps/documentation/javascript/reference#MapPanes) types.

[GoogleMaps OverlayView](https://developers.google.com/maps/documentation/javascript/reference#OverlayView) docs.

## Frag

```js
var MarkerCollection = React.createClass({
  render: function() {
    return (
      <Frag map={this.props.map}>
        <Marker {...props} />
        <Marker {...props} />
        <Marker {...props} />
      </Frag>
      );
  }
});
```

Frag is a helper component for creating reusable React GoogleMap components. This component has no functionality or output, it just allows you to return multiple components from a custom components `render` function.

The only prop required is the `map` prop (the GoogleMap instance), this is automatically passed down to all direct children of the `Map` component but will need to be manually set if you use `Frag` inside a custom component. The `Frag` component will then pass the `map` prop down to all of its direct children.

# PropTypes

```js
var React = require('react');
var ReactGoogleMaps = require('react-googlemaps');

var MyMap = React.createClass({
  propTypes: {
    myLocation: ReactGoogleMaps.PropTypes.LatLng.isRequired,
    myRegion: ReactGoogleMaps.PropTypes.LatLngBounds,
    myName: React.PropTypes.string
  },

  ...
});
```
A collection of useful propTypes when creating your own GoogleMaps components.
