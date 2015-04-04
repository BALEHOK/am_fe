/**
 * @jsx React.DOM
 */

var React = require('react');
var Flux = require('delorean').Flux;
var Router = require('react-router');
var Link = Router.Link;

var SearchResultsHeader = React.createClass({
	mixins:[Router.State, Flux.mixins.storeListener],
    componentWillMount: function() {
        var query = this.context.router.getCurrentQuery();
        if (query.searchId) {
            this.props.actions.loadSearchTracking(query.searchId);
        }
    },
    render: function() {
        var tracking = this.state.stores.search.tracking;
        var query = this.context.router.getCurrentQuery();

        return tracking ? (
            <div>
    			<h1 className="page-title">Search results: <span className="page-title__param">{tracking.verboseString}</span></h1>
    			<nav className="back-nav">
                    <Link to="result" params={{searchId : query.searchId}} className="link link_second">
                        <span className="icon icon_arrow-c_right"></span>Back to search
                    </Link>
    			</nav>
            </div>
        )
        : (<div />);
    }
});
module.exports = SearchResultsHeader;
