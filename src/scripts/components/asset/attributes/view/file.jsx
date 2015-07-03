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
        var value = this.props.params.value;
        if(value.length > 40) {
            value = value.slice(0, 30) + "..." + value.slice(-7);
        }
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <a onClick={this.handleDonwload} target="_blank">{value}</a>
            </div>
        );
    }
});

module.exports = Attribute;
