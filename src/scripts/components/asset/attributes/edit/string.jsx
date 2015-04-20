/**
 * @jsx React.DOM
 */

var React = require('react');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var cx = require('classnames');

var EditableAttribute = React.createClass({
    mixins: [ValidationMixin],
    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },
    getInitialState: function() {
        return {
            value: this.props.params.value,
        };
    },
    valueChanged: function(event) {
        var value = event.target.value;
        this.setState({
            value: value
        });
        this.props.params.value = value;
        this.validate({id: this.props.params.id, value: this.props.params.value});
    },
    render: function() {
        var isMultiline =  this.props.params.datatype == 'text';           
        
        var labelClasses = cx(this.state.groupClasses, 'input-txt', 'input-txt_' + (isMultiline ? 'textarea' : 'text'));
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <label className={labelClasses}>
                    {isMultiline
                        ? <textarea
                            onChange={this.valueChanged}
                            className="input-txt__field form-control" 
                            value={this.state.value}></textarea>
                        : <input 
                            type="text" 
                            onChange={this.valueChanged}
                            className="input-txt__field form-control" 
                            value={this.state.value} />
                    }
                    {this.state.hasFeedback 
                        ? <span className={this.state.feedbackClasses}></span>
                        : ''
                    }                        
                </label>
            </div>
        );
    }
});

module.exports = EditableAttribute;