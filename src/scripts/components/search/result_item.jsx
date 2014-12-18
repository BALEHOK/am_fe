/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');

var ResultItem = React.createClass({
    mixins: [Router.Navigation],
    render: function() {
        var assetLink = this.makeHref('asset-view', {
                assetTypeUid: this.props.model.get('dynEntityConfigUid'),
                assetUid: this.props.model.get('dynEntityUid')
            }, {searchId: this.props.searchId});
        return (
            <li className="search-results__item">
                <a className="search-results__item-link" href={assetLink}>
                    <span className="search-results__item-param search-results__item-param_name">
                        <span className="link">{this.props.model.get('name')}</span>
                    </span>
                    <span className="search-results__item-param search-results__item-param_category">
                        <span className="label">{this.props.model.get('categoryKeywords')}</span>
                    </span>
                    <span className="search-results__item-param search-results__item-param_attr">
                        <span className="search-results__item-attr">
                            {this.props.model.get('allAttribValues')}
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