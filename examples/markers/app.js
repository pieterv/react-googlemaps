"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');
var ReactGoogleMaps = require('../../');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var LatLng = GoogleMapsAPI.LatLng;

var GoogleMapMarkers = React.createClass({
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
        initialZoom={this.state.zoom}
        center={this.state.center}
        onCenterChange={this.handleCenterChange}
        width={700}
        height={700}
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

    var markers = update(this.state.markers, {$push: [marker]});

    this.setState({
      markers: markers,
      center: mapEvent.latLng
    });
  },

  handleCenterChange: function(map) {
    this.setState({
      center: map.getCenter()
    });
  }
});

ReactDOM.render(<GoogleMapMarkers />, document.getElementById('example'));
