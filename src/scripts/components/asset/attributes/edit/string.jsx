/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');

var EditableAttribute = React.createClass({
    mixins: [ValidationMixin],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    valueChanged: function(event) {
        var value = event.target.value;
        this.props.params.value = value;
        this.validate({id: this.props.params.id, value: this.props.params.value});
        this.forceUpdate();
    },

    render: function() {
        var isMultiline =  this.props.params.datatype == 'text';
        var classes = cx('input-txt', 'input-txt_' + (isMultiline ? 'textarea' : 'text'));
        return (
            <ControlWrapper
                name={this.props.params.name}
                className={classes}
                validationState={this.state.validation}>

                {isMultiline
                    ? <textarea
                        onChange={this.valueChanged}
                        className="input-txt__field form-control"
                        value={this.props.params.value}></textarea>
                    : <input
                        type="text"
                        onChange={this.valueChanged}
                        className="input-txt__field form-control"
                        value={this.props.params.value} />
                }

            </ControlWrapper>
        );
    }
});

module.exports = EditableAttribute;
