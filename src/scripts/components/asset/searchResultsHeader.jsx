/**
 * @jsx React.DOM
 */

var React = require('react');
var Flux = require('delorean').Flux;
var Router = require('react-router');
var Link = Router.Link;
var L20nMessage = require('../intl/l20n-message');

var searchResultRoutes = {
    0: 'result', // simple search
    1: 'resultByType' // searchBytype
}

var SearchResultsHeader = React.createClass({
	mixins:[Router.State, Flux.mixins.storeListener],

    watchStores: ['search'],

    contextTypes: {
        router: React.PropTypes.func
    },
    componentWillMount: function() {
        var query = this.context.router.getCurrentQuery();
        if (query.searchId) {
            this.props.actions.loadSearchTracking(query.searchId);
        }
    },
    render: function() {
        var tracking = this.state.stores.search.tracking;
        if (!tracking){
            return (<div />);
        }

        var query = this.context.router.getCurrentQuery();
        var resultRoute = searchResultRoutes[tracking.searchType];
        return (
            <div>
    			<h1 className="page-title">{L20nMessage('searchResultsTitle', 'Search results')}: <span className="page-title__param">{tracking.verboseString}</span></h1>
    			<nav className="back-nav">
                    <Link to={resultRoute} query={{searchId : query.searchId}} className="link link_second">
                        <span className="icon icon_arrow-c_right"></span>{L20nMessage('backToSearch', 'Back to search')}
                    </Link>
    			</nav>
            </div>
        );
    }
});
module.exports = SearchResultsHeader;
