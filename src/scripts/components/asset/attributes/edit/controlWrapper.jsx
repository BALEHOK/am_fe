/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');

var ControlWrapper = React.createClass({

    getDefaultProps: function() {
        return {
          notUseLabelTag: false
        };
    },

    render: function() {
        var groupClasses = cx(this.props.className, this.props.validationState.groupClasses);
        return (
            <div className="asset-data__param" data-param-id={this.props.id}>
                <span className="asset-data__param-title">{this.props.name}:</span>
                <span className="asset-data__param-content">
                    {this.props.notUseLabelTag
                        ? <span className={groupClasses}  title={this.props.validationState.message}>
                            {this.props.children}
                            {this.props.validationState.hasFeedback
                                ? <span className={this.props.validationState.feedbackClasses}></span>
                                : ''
                            }
                          </span>
                        : <label className={groupClasses}  title={this.props.validationState.message}>
                            {this.props.children}
                            {this.props.validationState.hasFeedback
                                ? <span className={this.props.validationState.feedbackClasses}></span>
                                : ''
                            }
                          </label>
                    }
                    {this.props.isRequired
                        ? <span className="asset-data__param-required">*</span>
                        : null
                    }
                </span>
            </div>
        );
    }
});

module.exports = ControlWrapper;
