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
                </label>
                {this.props.hasFormula
                    ? <button className="btn btn_type_first pull-right btn_size_small"
                        onClick={this.props.onRecalc}>
                        <i className="btn__icon btn__icon_refresh"></i>
                        <span>Recalc</span>
                      </button>
                    : ''
                }
            </div>
        );
    }
});

module.exports = ControlWrapper;
