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
    	var deletedText = this.props.asset.isDeleted
    		? ' (deleted) '
    		: '';
        return (
            <div className="revision-info">
                    <span className="light-grey">[rev.{this.props.asset.revision}{deletedText}  &mdash;  {this.getUpdatedAt()}]</span>
            </div>
        );
    }
});

module.exports = RevisionInfo;
