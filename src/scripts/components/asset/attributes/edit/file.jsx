/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var File = require('../file.jsx');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');

var FileAttribute = React.createClass({
    mixins: [ValidationMixin],
    contextTypes: {
        router: React.PropTypes.func
    },
    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    getInitialState: function() {
        return { };
    },

    valueChanged: function(name) {
        this.props.params.value = name;
        this.validate({id: this.props.params.id, value: this.props.params.value});
    },

    onStart: function() {
        this.setState({
            validation: {
                hasFeedback: true,
                feedbackClasses: cx(this.state.validation.feedbackClasses, 'form-control-feedback_loading')
            }
        });
    },

    render: function() {
        var params = this.context.router.getCurrentParams();
        return (
            <ControlWrapper
                name={this.props.params.name}
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>

                <File onUpload={this.valueChanged}
                    onStart={this.onStart}
                    attributeId={this.props.params.id}
                    assetId={params.assetId}
                    assetTypeId={params.assetTypeId} />

            </ControlWrapper>
        );
    }
});

module.exports = FileAttribute;
