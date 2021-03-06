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
            url: FileUrlProvider.getImageUrl(imageUrl)
        });
    },

    remove: function(e) {
      this.props.params.value = undefined;
      this.state.url = undefined;
      this.forceUpdate();
    },

    render: function() {
        return (
            <FileEditAttribute remove={this.remove} actions={this.props.actions} params={this.props.params} onUpload={this.handleUpload}>
                {this.state.url ? <img src={this.state.url} /> : '' }
            </FileEditAttribute>
        );
    }
});

module.exports = ImageEditAttribute;
