/**
 * @jsx React.DOM
 */

var React = require('react');
var ValidationMixin = require('../../../../mixins/ValidationMixin');

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
            
        var cx = React.addons.classSet;
        var labelClasses = cx('input-txt', 'input-txt_' + (isMultiline ? 'textarea' : 'text'));
        var groupClasses = cx({
            'form-group': true,
            'has-feedback': this.state.hasFeedback,
            'has-error': !_.isUndefined(this.state.isValid) && !this.state.isValid,
            'has-success': this.state.isValid,
        });
        var feedbackClasses = cx('glyphicon', 'form-control-feedback', 
            'glyphicon' + (this.state.isValid ? '-ok' : '-remove'));
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <label className={labelClasses}>
                    <div className={groupClasses}>
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
                            ? <span className={feedbackClasses}></span>
                            : ''
                        }                        
                    </div>
                </label>
            </div>
        );
    }
});

module.exports = EditableAttribute;