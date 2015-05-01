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
        var params = this.context.router.getCurrentParams();
        var url = this.props.params.value 
            ? FileUrlProvider.getFileUrl(params.assetTypeId, params.assetId, this.props.params.id)
            : '';
        return { 
            url: url
        };
    },

    handleUpload: function(filename, fileId) {
        this.setState({
            url: FileUrlProvider.getInstantFileUrl(fileId)
        });
    },

    render: function() {
        var src = this.state.url ? this.state.url + '&w=165&h=95&mode=crop' : '';
        return (
            <FileEditAttribute actions={this.props.actions} params={this.props.params} onUpload={this.handleUpload}>
                <img src={src} />
            </FileEditAttribute>
        );
    }
});

module.exports = ImageEditAttribute;
