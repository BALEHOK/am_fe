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

    valueChanged: function(bt, op) {
        return () => {
            if(this.props.params.value & op) {
                this.props.params.value = bt - op ;
            } else {
                this.props.params.value = bt;
            }
            this.validate({id: this.props.params.id, value: this.props.params.value});
            this.forceUpdate();
        };
    },

    render: function() {
        return (
            <ControlWrapper
                id={this.props.params.id}
                name={this.props.params.name}
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>
                <Permission editable={true}
                    onChange={this.valueChanged}
                    params={this.props.params} />


            </ControlWrapper>
        );
    }
});

module.exports = PermissionEdit;
