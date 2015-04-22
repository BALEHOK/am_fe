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

    valueChanged: function(event) {
        this.props.params.value = event.target.value;
        this.validate({id: this.props.params.id, value: this.props.params.value});
        this.forceUpdate();
    },

    render: function() {
        return (
            <ControlWrapper
                name={this.props.params.name}
                className="rich-editor"
                validationState={this.state.validation}>

                <Quill toolbar={items} theme="snow" value={this.props.params.value}/>

            </ControlWrapper>
        );
    }
});

module.exports = RichtextEdit;