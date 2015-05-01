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
    render: function() {
        var urlParams = this.context.router.getCurrentParams();
        var params = this.props.params;
        var url = FileUrlProvider.getFileUrl(urlParams.assetTypeId, urlParams.assetId, params.id);
        params = _.extend(params, { url: url });
        return <Url params={params} />;
    }
});

module.exports = Attribute;
