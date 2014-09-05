/** @jsx React.DOM */
"use strict";

var React = require('react/addons');
var ReactGoogleMaps = require('../../');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var LatLng = GoogleMapsAPI.LatLng;

var GoogleMapWithMarkers = React.createClass({
  getInitialState: function() {
    return {
      center: new LatLng(-34.397, 150.644),
      zoom: 16,
      markers: [
        {position: new LatLng(-34.397, 150.644)}
      ]
    };
  },

  render: function() {
    return (
      <Map
        zoom={this.state.zoom}
        center={this.state.center}
        width={700}
        height={700}
        onZoomChange={this.handleZoomChange}
        onCenterChange={this.handleCenterChange}
        onClick={this.handleMapClick}>
        {this.state.markers.map(this.renderMarkers)}
      </Map>
      );
  },

  renderMarkers: function(state, i) {
    return (
      <Marker position={state.position} key={i} />
      );
  },

  handleMapClick: function(mapEvent) {
    var marker = {
      position: mapEvent.latLng
    };

    var markers = React.addons
      .update(this.state.markers, {$push: [marker]});

    this.setState({markers: markers});
  },

  handleZoomChange: function(map) {
    var zoom = map.getZoom();
    if (this.state.zoom > zoom) {
      this.setState({zoom: zoom});
    }
  },

  handleCenterChange: function(map) {
    var center = map.getCenter();
    this.setState({center: center});
  }
});

React.renderComponent(<GoogleMapWithMarkers />, document.body);
