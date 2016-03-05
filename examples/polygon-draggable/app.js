"use strict";

// This example creates draggable triangles on the map.
// Note also that the red triangle is geodesic, so its shape changes
// as you drag it north or south.
// Based on: https://developers.google.com/maps/documentation/javascript/examples/polygon-draggable

var React = require('react');
var ReactDOM = require('react-dom');
var ReactGoogleMaps = require('../../');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Polygon = ReactGoogleMaps.Polygon;
var LatLng = GoogleMapsAPI.LatLng;

var GoogleMapPolygonDraggable = React.createClass({
  getInitialState: function() {
    return {
      center: new LatLng(24.886, -70.268),
      blueCoords: [
        new LatLng(25.774, -60.190),
        new LatLng(18.466, -46.118),
        new LatLng(32.321, -44.757)
      ],
      redCoords: [
        new LatLng(25.774, -80.190),
        new LatLng(18.466, -66.118),
        new LatLng(32.321, -64.757)
      ]
    };
  },

  render: function() {
    return (
      <Map
        initialZoom={1}
        initialCenter={this.state.center}
        width={700}
        height={700}>

        <Polygon
          initialPaths={this.state.blueCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35}
          draggable
          geodesic />

        <Polygon
          initialPaths={this.state.redCoords}
          strokeColor="#FF0000"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#FF0000"
          fillOpacity={0.35}
          draggable
          geodesic />
      </Map>
      );
  }
});

ReactDOM.render(<GoogleMapPolygonDraggable />, document.getElementById('example'));
