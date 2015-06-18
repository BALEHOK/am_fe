/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var File = require('../file.jsx');
var ControlWrapper = require('./controlWrapper');
var ValidationMixin = require('../../../../mixins/ValidationMixin');

var FileEditAttribute = React.createClass({
    mixins: [ValidationMixin],
    contextTypes: {
        router: React.PropTypes.func
    },
    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    valueChanged: function(filename, imageUrl) {
        this.props.params.value = filename;
        this.setState({
            validation: {
                feedbackClasses: cx(this.state.validation.feedbackClasses, {
                    'form-control-feedback_loading': false
                })
            }
        });
        //this.validate({id: this.props.params.id, value: this.props.params.value});
        if (this.props.onUpload)
            this.props.onUpload(filename, imageUrl);
    },

    onStart: function() {
        this.setState({
            validation: {
                hasFeedback: true,
                feedbackClasses: cx(this.state.validation.feedbackClasses, 'form-control-feedback_loading')
            }
        });
    },

    remove: function() {
      this.props.params.value = undefined;
      this.forceUpdate();
    },

    render: function() {
        let remove = this.props.remove || this.remove;
        var params = this.context.router.getCurrentParams();
        let name = this.props.params.value ?
          this.props.params.value.split('/').slice(-1)[0] : "";
        let cnt;
        if(name) {
          cnt = (
            <div>
              <div className="btn btn_type_one btn_size_small pull-right" onMouseUp={remove}>
                  <i className="btn__icon btn__icon_cross"></i>Remove
              </div>
              {this.props.children}
              <div>{name}</div>
            </div>
          );
        } else {
          cnt = <File onUpload={this.valueChanged}
              onStart={this.onStart}
              attributeId={this.props.params.id}
              assetId={params.assetId}
              assetTypeId={params.assetTypeId} />;
        }
        return (
            <ControlWrapper
                name={this.props.params.name}
                className="input-txt input-txt_size_small"
                validationState={this.state.validation}>
                {cnt}
            </ControlWrapper>
        );
    }
});

module.exports = FileEditAttribute;
