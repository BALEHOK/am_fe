/**
 * @jsx React.DOM
 */

var React = require('react');
var Google = require('google-maps');
var {GoogleMapsMixin, Map, Marker} = require("react-google-maps");
var StringAttribute = require('./string');

var HelperComponent = React.createClass({
    mixins: [GoogleMapsMixin],
    render: function() {
        var data = this.props.params.split(';');
        return (
            <div className="googlemaps">
                <Map center={new google.maps.LatLng(-25.363882, 131.044922)} style={{height: "396px", width: "600px"}} zoom={3}/>
                <div className="googlemaps__inputs">
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
                </div>
            </div>
        );

    }
});


var Attribute = React.createClass({
    componentDidMount: function() {
        Google.load(google => {
            this.google = google
            this.forceUpdate();
        });
    },
    render: function() {
        if(this.google) {
            return (
                <div className="asset-data__param">
                    <span className="asset-data__param-title">{this.props.params.name}:</span>
                    <HelperComponent googleMapsApi={this.google.maps} params={this.props.params.value}/>
                </div>
            );
        } else {
            return <StringAttribute params={this.props.params} />;
        }
    }
});

module.exports = Attribute;