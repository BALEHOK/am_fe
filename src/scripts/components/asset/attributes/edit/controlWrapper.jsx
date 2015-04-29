/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');

var ControlWrapper = React.createClass({
    render: function() {
        var groupClasses = cx(this.props.className, this.props.validationState.groupClasses);
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.name}:</span>
                <label className={groupClasses}>
                    {this.props.children}
                    {this.props.validationState.hasFeedback
                        ? <span className={this.props.validationState.feedbackClasses}></span>
                        : ''
                    }
                </label>
            </div>
        );
    }
});

module.exports = ControlWrapper;
