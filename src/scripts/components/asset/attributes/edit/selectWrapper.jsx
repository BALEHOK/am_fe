/**
 * @jsx React.DOM
 */

/**
 * TODO: refactor in one component with controlWrapper
 */

var React = require('react');
var cx = require('classnames');

var SelectWrapper = React.createClass({
    render: function() {
        var groupClasses = cx(this.props.className, this.props.validationState.groupClasses);
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.name}:</span>
                <span className={groupClasses}  title={this.props.validationState.message}>
                    {this.props.children}
                    {this.props.validationState.hasFeedback
                        ? <span className={this.props.validationState.feedbackClasses}></span>
                        : ''
                    }
                </span>
            </div>
        );
    }
});

module.exports = SelectWrapper;
