/**
 * @jsx React.DOM
 */

var React = require('react');
var List = require('./list');
var File = require('../file');
var ValidationMixin = require('../../../../mixins/ValidationMixin');
var ControlWrapper = require('./controlWrapper');
var LoadingFormMixin = require('../../../../mixins/LoadingFormMixin.js');
var cx = require('classnames');

var EditableAttribute = React.createClass({

    mixins: [ValidationMixin, LoadingFormMixin],

    contextTypes: {
        router: React.PropTypes.func
    },

    componentWillMount: function() {
        this.setupValidation(this.props.actions);
    },

    onUpload: function(docName) {
      this.props.params.value = {
        id: null,
        name : docName
      };
      this.onLoadEnd();
    },

    render: function() {
        var params = this.context.router.getCurrentParams();
        var classes = cx('select', 'select_size_small', 'form-group');
        return (
          <ControlWrapper
              name={this.props.params.name}
              className={classes}
              validationState={this.state.validation}>

              <div className="asset-data__document">
                  <File
                      onUpload={this.onUpload}
                      onStart={this.onStart}
                      attributeId={this.props.params.id}
                      assetId={params.assetId}
                      assetTypeId={params.assetTypeId}
                  />
              </div>
              <List
                params={this.props.params}
                name="docs"
                actions={this.props.actions}
                mapper={(el) => ({id: el.id, name: el.name})}
                dispatcher={this.props.dispatcher}>
                </List>
            </ControlWrapper>
        );
    }
});

module.exports = EditableAttribute;
