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
                <div className="asset-data__param">
                    <span className="asset-data__param-title">{this.props.params.name}:</span>
                    <GoogleMapsComponent 
                        googleMapsApi={this.google.maps} 
                        points={points}
                        viewOnly={this.props.viewOnly}
                        onChange={this.handleMapChange} />
                </div>
            );
        } else {
            return <StringAttribute params={this.props.params} />;
        }
    }
});

module.exports = GoogleMapsAttributeWrapper;