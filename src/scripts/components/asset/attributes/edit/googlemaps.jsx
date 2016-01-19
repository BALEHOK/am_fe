/**
 * @jsx React.DOM
 */

var React = require('react');
var Google = require('google-maps');
var GoogleMapsComponent = require('./googlemapsComponent');
var StringAttribute = require('./string');

var GoogleMapsAttributeWrapper = React.createClass({

    componentDidMount: function() {
        Google.load(google => {
            this.google = google
            this.forceUpdate();
        });
    },

    handleMapChange: function(coords) {
        this.props.params.value = coords.join(';');
    },

    render: function() {
        if(this.google) {

            var points = this.props.params.value
                ? this.props.params.value.split(';')
                : [];

            return (
                <div className="asset-data__param" data-param-id={this.props.params.id}>
                    <span className="asset-data__param-title">{this.props.params.name}:</span>
                    <span className="asset-data__param-content">
                        <GoogleMapsComponent
                            googleMapsApi={this.google.maps}
                            points={points}
                            viewOnly={this.props.viewOnly}
                            onChange={this.handleMapChange}
                        />
                    </span>
                </div>
            );
        } else {
            return <StringAttribute params={this.props.params} />;
        }
    }
});

module.exports = GoogleMapsAttributeWrapper;
