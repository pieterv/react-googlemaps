"use strict";

// This example creates an interactive map which constructs a
// polyline based on user clicks. Note that the polyline only appears
// once its path property contains two LatLng coordinates.
// Based on: https://developers.google.com/maps/documentation/javascript/examples/polyline-complex

var React = require('react');
var ReactDOM = require('react-dom');
var ReactGoogleMaps = require('../../');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var Polyline = ReactGoogleMaps.Polyline;
var LatLng = GoogleMapsAPI.LatLng;

var GoogleMapPolylineComplex = React.createClass({
  getInitialState: function() {
    return {
      center: new LatLng(41.879535, -87.624333),
      zoom: 7,
      linePath: []
    };
  },

  render: function() {
    return (
      <Map
        initialZoom={this.state.zoom}
        initialCenter={this.state.center}
        width={700}
        height={700}
        onClick={this.handleMapClick}>
        {this.renderPolyline()}
        {this.state.linePath.map(this.renderMarkers)}
      </Map>
      );
  },

  renderMarkers: function(position, i) {
    return (
      <Marker
        position={position}
        key={i} />
      );
  },

  renderPolyline: function() {
    return (
      <Polyline
        path={this.state.linePath}
        strokeColor="#000000"
        strokeOpacity={1.0}
        strokeWeight={3} />
      );
  },

  handleMapClick: function(mapEvent) {
    var linePath = React.addons
      .update(this.state.linePath, {
        $push: [mapEvent.latLng]
      });

    this.setState({
      linePath: linePath
    });
  }
});

ReactDOM.render(<GoogleMapPolylineComplex />, document.getElementById('example'));
