/**
 * @jsx React.DOM
 */

var React = require('react');
var ImageAttribute = require('./image');
var Flux = require('delorean').Flux;

var Attribute = React.createClass({
	  mixins:[Flux.mixins.storeListener],
    render: function() {
    	var params = _.extend({}, this.props.params, {
    		data: this.state.stores.asset.asset.barcode
    	});
        return <ImageAttribute params={params} />
    }
});

module.exports = Attribute;