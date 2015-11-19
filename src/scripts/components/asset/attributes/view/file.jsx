/**
 * @jsx React.DOM
 */

var React = require('react');
var Url = require('./url')
var FileUrlProvider = require('../../../../services/file_url_provider');

var Attribute = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    handleDonwload: function() {
        var urlParams = this.context.router.getCurrentParams();
        var url = FileUrlProvider.getFileUrl(
            urlParams.assetTypeId,
            urlParams.assetId,
            this.props.params.id);
    },

    render: function() {
        var params = this.props.params;
        var value = this.props.params.value;
        if(value.length > 40) {
            value = value.slice(0, 30) + "..." + value.slice(-7);
        }
        return (
            <div className="asset-data__param" data-param-id={params.id}>
                <span className="asset-data__param-title">{params.name}:</span>
                <span className="asset-data__param-content">
                    <a onClick={this.handleDonwload} target="_blank">{value}</a>
                </span>
            </div>
        );
    }
});

module.exports = Attribute;
