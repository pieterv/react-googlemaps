"use strict";

// This example creates an overlay view on the map.
// This view can render any React DOM element and can have
// its own state.

var React = require('react');
var ReactDOM = require('react-dom');
var ReactGoogleMaps = require('../../');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var OverlayView = ReactGoogleMaps.OverlayView;
var LatLng = GoogleMapsAPI.LatLng;

var GoogleMapOverlayViewSimple = React.createClass({
  getInitialState: function() {
    return {
      center: new LatLng(-41.28646, 174.77623),
      count: 0
    };
  },

  render: function() {
    return (
      <Map
        initialZoom={15}
        initialCenter={this.state.center}
        width={700}
        height={700}>

        <OverlayView
          mapPane="floatPane"
          style={{padding: 15, backgroundColor: '#fff', border: '1px solid #000'}}
          position={this.state.center}>
          <h1>Simple overlay!</h1>
          <button
            onClick={this.handleButtonClick}>
            I have been clicked {this.state.count} time{this.state.count === 1 ? '' : 's'}
          </button>
        </OverlayView>
      </Map>
      );
  },

  handleButtonClick: function() {
    this.setState({
      count: this.state.count + 1
    });
  }
});

ReactDOM.render(<GoogleMapOverlayViewSimple />, document.getElementById('example'));
