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

    render: function() {
        var params = this.context.router.getCurrentParams();
        return (
            <FileEditAttribute actions={this.props.actions} params={this.props.params}>
                <img src={FileUrlProvider.getFileUrl(params.assetTypeId, params.assetId, this.props.params.id)} />
            </FileEditAttribute>
        );
    }
});

module.exports = ImageEditAttribute;
