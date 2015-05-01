/**
 * @jsx React.DOM
 */

var React = require('react');
var Google = require('google-maps');
var {GoogleMaps, Marker} = require("react-google-maps");

var GoogleMapsComponent = React.createClass({

    getInitialState () {
        var markers = [];
        var center = new google.maps.LatLng(50.85, 4.34);
        var bounds = new google.maps.LatLngBounds();
        this.props.points.map((coord, index) => {
            var latLng = coord.split(',');
            if (latLng.length == 2) {
                var position = new google.maps.LatLng(latLng[0], latLng[1]);
                bounds.extend(position);
                markers.push({
                    position: position,
                    key: index,
                });
            }
        });
        if (markers.length > 0) {
            center = bounds.getCenter();
        }
        return {
            markers: markers,
            center:  center,
            zoom: 12
        };
    },

    componentDidMount: function() {
        if (this.state.markers.length == 0 && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              this.setState({
                center: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              });
            });
        }
    },

    handleMapClick: function(event) {
        var markers = this.state.markers;
        markers.push({
            position: event.latLng,
            key: Date.now(),
        });
        this.setState({markers: markers});
        this.refs.map.panTo(event.latLng);
        this.notifyMapValueChanged();
    },

    notifyMapValueChanged: function() {
        var coords = _.chain(this.state.markers)
            .pluck('position')
            .map(latlon => latlon.toUrlValue())
            .value();
        this.props.onChange(coords);
    },

    handleMarkerRightClick: function(index, event) {
        var markers = this.state.markers;
        markers.splice(index, 1);
        this.setState({markers: markers});
        this.notifyMapValueChanged();
    },

    render: function() {
        var onClickFunc = this.props.viewOnly
            ? null
            : this.handleMapClick;
        return (
            <div className="googlemaps">
                <GoogleMaps ref="map"
                    center={this.state.center}
                    containerProps={{style: {height: "300px"}}}
                    mapProps={{style: { height: "300px" }}}
                    googleMapsApi={this.props.googleMapsApi}
                    style={{height: "396px", width: "600px"}}
                    zoom={this.state.zoom}
                    onClick={onClickFunc}>
                {this.state.markers.map(toMarker, this)}
                </GoogleMaps>
                {/*<div className="googlemaps__inputs">
                    <div className="input-group input-group_block">
                        <div className="grid input-group__row">
                            <div className="grid__item one-half">
                                <div className="input-txt input-txt_width_full">
                                    <input name="test" className="input-txt__field" placeholder="Source" value={data[0]}/>
                                </div>
                            </div>
                            <div className="grid__item one-half">
                                <div className="input-txt input-txt_width_full">
                                    <input name="test" className="input-txt__field" placeholder="Destination" value={data[1]}/>
                                </div>
                            </div>
                        </div>
                        <div className="input-txt input-txt_width_full input-group__row">
                            <input name="test" className="input-txt__field" placeholder="Additional info" value={data[2]}/>
                        </div>
                    </div>
                </div>*/}
            </div>
        );

        function toMarker (marker, index) {
          return <Marker
            position={marker.position}
            key={marker.key}
            onRightclick={this.handleMarkerRightClick.bind(this, index)} />;
        }

    }
});
module.exports = GoogleMapsComponent;
