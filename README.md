React Google Maps [![Build Status](https://travis-ci.org/pieterv/react-googlemaps.svg?branch=master)](https://travis-ci.org/pieterv/react-googlemaps)
============

A declarative React interface to Google Maps.

Check it out:

* [Example usage](examples)
* [API docs](docs/api.md)
* [What's new](CHANGELOG.md)

Important Notes
---------------

This is an alpha release. The API and organizational structure are subject to
change. Comments and contributions are much appreciated.

Installation
------------

```sh
npm install react-googlemaps --save
```

This library is written with CommonJS modules. If you are using
browserify, webpack, or similar, you can consume it like anything else
installed from npm.

Usage
-----

```js
var React = require('react');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;

var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var OverlayView = ReactGoogleMaps.OverlayView;

function handleClick(e) {
  console.log('Clicked at position', e.latLng);
}

React.renderComponent(
  <Map
    initialZoom={10}
    initialCenter={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)}>

    <Marker
      onClick={handleClick}
      position={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)} />

    <OverlayView
      style={{backgroundColor: '#fff'}}
      position={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)}>
      <p>Some content</p>
    </OverlayView>
  </Map>,
  mountNode
);
```

Checkout the [API docs](docs/api.md) or the [`examples`](examples) directory for more detailed usage.

License
-------

Licensed under MIT. [Full license here »](LICENSE)
