/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var Permission = require('../permission');

var PermissionEdit = React.createClass({
    mixins: [ValidationMixin],

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    valueChanged: function(bt) {
        this.props.params.value ^= bt;
        this.validate({id: this.props.params.id, value: this.props.params.value});
        this.forceUpdate();
    },

    render: function() {
        return (
            <ControlWrapper
                name={this.props.params.name}
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>
                <Permission editable={true}
                    onChange={this.valueChanged.bind(this)}
                    params={this.props.params} />


            </ControlWrapper>
        );
    }
});

module.exports = PermissionEdit;