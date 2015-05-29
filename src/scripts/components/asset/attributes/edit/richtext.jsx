/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var Quill = require('react-quill');
var items = $.extend([], Quill.Toolbar.defaultItems);
items[0].items.pop();

var RichtextEdit = React.createClass({
    mixins: [ValidationMixin],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    onTextChange: function(value) {
        this.props.params.value = value;
        this.validate({id: this.props.params.id, value: this.props.params.value});
        this.forceUpdate();
    },

    render: function() {
        var value = this.props.params.value || ' ';
        return (
            <ControlWrapper
                name={this.props.params.name}
                className="rich-editor"
                validationState={this.state.validation}>

                <Quill toolbar={items} onChange={_.debounce(this.onTextChange, 500)} theme="snow" value={value}/>

            </ControlWrapper>
        );
    }
});

module.exports = RichtextEdit;
