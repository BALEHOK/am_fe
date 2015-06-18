/**
 * @jsx React.DOM
 */

var React = require('react');
var FileEditAttribute = require('./file.jsx');
var FileUrlProvider = require('../../../../services/file_url_provider');

var ImageEditAttribute = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            url: _.startsWith(this.props.params.value, '/')
            ? FileUrlProvider.getImageUrl(this.props.params.value)
            : undefined
        };
    },

    handleUpload: function(filename, imageUrl) {
        this.setState({
            url: FileUrlProvider.getInstantImageUrl(imageUrl)
        });
    },

    remove: function(e) {
      console.log(e);
      this.props.params.value = undefined;
      this.state.url = undefined;
      this.forceUpdate();
    },

    render: function() {
        let name = this.props.params.value ?
          this.props.params.value.split('/').slice(-1)[0] : "";
        let btn;
        if(name) {
          btn = <div className="btn btn_type_one btn_size_small pull-right" onClick={this.remove}>
              <i className="btn__icon btn__icon_cross"></i>Remove
          </div>;
        }
        return (
            <FileEditAttribute remove={this.remove} actions={this.props.actions} params={this.props.params} onUpload={this.handleUpload}>
                {this.state.url ? <img src={this.state.url} /> : '' }
            </FileEditAttribute>
        );
    }
});

module.exports = ImageEditAttribute;
