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
                <label className={groupClasses}  title={this.props.validationState.message}>
                    {this.props.children}
                    {this.props.validationState.hasFeedback
                        ? <span className={this.props.validationState.feedbackClasses}></span>
                        : ''
                    }
                    {this.props.hasFormula
                        ? <span className="glyphicon form-control-feedback icon_asterisk"></span>
                        : ''
                    }
                </label>
            </div>
        );
    }
});

module.exports = ControlWrapper;
