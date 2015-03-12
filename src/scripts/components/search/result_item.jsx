/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');

var ResultItem = React.createClass({
    mixins: [Router.Navigation],
    render: function() {        
        var assetLink;
        if (this.props.isHistory) {
            assetLink = this.makeHref('asset-by-uid', {
                assetTypeId: this.props.model.dynEntityConfigId,
                assetId: this.props.model.dynEntityId,
                uid: this.props.model.dynEntityUid
            }, {searchId: this.props.searchId});
        } else {
            assetLink = this.makeHref('asset-view', {
                assetTypeId: this.props.model.dynEntityConfigId,
                assetId: this.props.model.dynEntityId,
            }, {searchId: this.props.searchId});
        }
        return (
            <li className="search-results__item">
                <a className="search-results__item-link" href={assetLink}>
                    <span className="search-results__item-param search-results__item-param_name">
                        <span className="link">{this.props.model.name}</span>
                    </span>
                    <span className="search-results__item-param search-results__item-param_category">
                        <span className="label">{this.props.model.categoryKeywords}</span>
                    </span>
                    <span className="search-results__item-param search-results__item-param_attr">
                        <span className="search-results__item-attr">
                            {this.props.model.allAttribValues}
                        </span>
                    </span>
                    <span className="search-results__item-param search-results__item-param_link">
                        <span className="link"><span className="icon icon_angle-right"></span></span>
                    </span>
                </a>
            </li>
        );
    }
});

module.exports = ResultItem;