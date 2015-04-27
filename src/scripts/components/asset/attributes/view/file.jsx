/**
 * @jsx React.DOM
 */

var React = require('react');
var Url = require('./url')

var Attribute = React.createClass({
	contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
    	var urlParams = this.context.router.getCurrentParams();
    	var params = this.props.params;
    	var url = `/FileHandler.ashx?assetTypeId=${urlParams.assetTypeId}&assetId=${urlParams.assetId}&attributeId=${params.id}`;
    	params = _.extend(params, { url: url });
        return <Url params={params} />;
    }
});

module.exports = Attribute;