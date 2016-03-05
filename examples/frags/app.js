"use strict";

// This example creates a reusable react component made
// up of ReactGoogleMap components. You can click the map
// to add a new instance or drag the component to move
// it around.

var React = require('react');
var ReactDOM = require('react-dom');
var ReactGoogleMaps = require('../../');
var update = require('react-addons-update');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Circle = ReactGoogleMaps.Circle;
var Polyline = ReactGoogleMaps.Polyline;
var Frag = ReactGoogleMaps.Frag;
var LatLng = GoogleMapsAPI.LatLng;

var DraggableFace = React.createClass({
  render: function() {
    var centerLat = this.props.center.lat();
    var centerLng = this.props.center.lng();
    return (
      <Frag
        map={this.props.map}>
        <Circle
          draggable
          onDrag={this.props.onDrag}
          center={new LatLng(centerLat + 0.05, centerLng + 0.1)}
          radius={3000} />

        <Circle
          draggable
          onDrag={this.props.onDrag}
          center={new LatLng(centerLat + 0.05, centerLng - 0.1)}
          radius={3000} />

        <Polyline
          draggable
          onDrag={this.props.onDrag}
          path={[
            new LatLng(centerLat - 0.05, centerLng + 0.1),
            new LatLng(centerLat - 0.05, centerLng - 0.1)
            ]} />
      </Frag>
      );
  }
});

var GoogleMapFrags = React.createClass({
  getInitialState: function() {
    return {
      center: new LatLng(41.879535, -87.624333),
      zoom: 8,
      faces: [
        new LatLng(42.48374, -87.01171)
      ]
    };
  },

  render: function() {
    return (
      <Map
        initialZoom={this.state.zoom}
        initialCenter={this.state.center}
        width={700}
        height={700}
        onClick={this.handleFaceCreate}>
        {this.state.faces.map(this.renderFace)}
      </Map>
      );
  },

  renderFace: function(position, i) {
    return (
      <DraggableFace
        center={position}
        onDrag={this.handleFaceDrag.bind(null, i)}
        key={i} />
      );
  },

  handleFaceDrag: function(i, e) {
    var faces = update(this.state.faces, {$splice: [[i, 1, e.latLng]]});

    this.setState({
      faces: faces
    });
  },

  handleFaceCreate: function(e) {
    var faces = React.addons
      .update(this.state.faces, {$push: [e.latLng]});

    this.setState({
      faces: faces
    });
  }
});

ReactDOM.render(<GoogleMapFrags />, document.getElementById('example'));
