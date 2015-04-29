/**
 * @jsx React.DOM
 */

var React = require('react');
var GoogleMapsEdit = require('../edit/googlemaps');

var GoogleMapsViewWrapper = React.createClass({
	render: function() {
		return <GoogleMapsEdit viewOnly={true} {...this.props} />;
	}
});

module.exports = GoogleMapsViewWrapper;