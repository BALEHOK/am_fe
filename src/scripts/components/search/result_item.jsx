/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');

var ResultItem = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        var query = {searchId: this.props.searchId};
        if (this.props.isHistory)
            query.uid = this.props.model.dynEntityUid;
        var assetLink = this.context.router.makeHref('asset-view', {
            assetTypeId: this.props.model.dynEntityConfigId,
            assetId: this.props.model.dynEntityId,
        }, query);
        return (
            <li className="search-results__item">
                <a className="search-results__item-link" href={assetLink}>
                    <span className="search-results__item-param search-results__item-param_name">
                        <span className="link">{this.props.model.displayValues}</span>
                    </span>
                    <span className="search-results__item-param search-results__item-param_category">
                        {this.props.model.categoryKeywords
                            ? <span className="label">{this.props.model.categoryKeywords}</span>
                            : null
                        }
                    </span>
                    <span className="search-results__item-param search-results__item-param_attr">
                        <span className="search-results__item-attr">
                            {this.props.model.displayValues.map((item) => {
                                return <p><strong>{item.key}:</strong> {item.value}</p>
                            })}
                        </span>
                        <span className="search-results__item-attr search-results__item-attr_extended">
                            {this.props.model.displayExtValues.map((item) => {
                                return <p><strong>{item.key}:</strong> {item.value}</p>
                            })}
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
