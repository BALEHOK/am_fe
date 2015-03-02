/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var ValueTransformer = require('../../util/valueTransformer').ValueTransformer;

var RevisionInfo = React.createClass({
	getDefaultProps: function () {
    	return {
	      	dateTransform: new ValueTransformer(),
	      	asset: {
	      		revision: undefined,
	      		updatedAt: undefined
	      	}
	    }
	},
	getUpdatedAt: function () {
		return this.props.dateTransform.getTransformedValue(this.props.asset.updatedAt);
	},
    render: function() {
        return (
				<nav className="back-nav">
                    <span className="light-grey">[rev.{this.props.asset.revision}  &mdash;  {this.getUpdatedAt()}]</span>
                </nav>
        );
    }
});

module.exports = RevisionInfo;