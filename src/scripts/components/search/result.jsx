/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var ReactSelectize = require('../common/react-selectize');
var SearchSimpleForm = require('./searchSimpleForm');
var RefinementLink = require('./refinement_link');
var ResultItem = require('./result_item');
var ResultPagination = require('./resultPagination.jsx');

var SearchDispatcher = require('../../dispatchers/SearchDispatcher');
var SearchActions = require('../../actions/SearchActions');

var ResultPage = React.createClass({
    mixins: [Router.Navigation, Router.State],
    sortItems: [
        { name: "Rank", id: 0 },
        { name: "Date", id: 1 },
        { name: "Location", id: 2 },
        { name: "User", id: 3 },
    ],
    getInitialState: function() {
        var query = this.getQuery();
        return {
            searchId: null,
            counters: {
                totalCount: null,
                assetTypes: [],
                taxonomies: []
            },
            isTilesView: false
        };
    },

    componentWillMount: function() {
        this.dispatcher = SearchDispatcher;
        this.actions = new SearchActions(this.dispatcher);
        var stores = this.dispatcher.stores;
        this.forceUpdateBound = this.forceUpdate.bind(this);
        Object.keys(this.dispatcher.stores).map(function(store) {
            stores[store].onChange(this.forceUpdateBound);
        }.bind(this));

        this.dispatcher.stores.filters.onChange(this.syncUrl);
        this.actions.changeSearchFilter(this.getQuery());
    },

    componentWillUnmount: function() {
        var stores = this.dispatcher.stores;
        Object.keys(this.dispatcher.stores).map(function(store) {
            stores[store].listener.removeListener('change', this.forceUpdateBound);
        }.bind(this));
        this.dispatcher.stores.filters.listener.removeListener('change', this.syncUrl);
    },

    syncUrl: function() {
        var filters = this.dispatcher.getStore('filters').getState();
        var clean = Object.keys(filters).reduce(function(acc, key) {
            if(filters[key]) {
                acc[key] = filters[key]
            }
            return acc;
        }, {});
        this.transitionTo('/search/result?' + $.param(clean));
    },

    filterCounters: function(param, counter) {
        var id = this.dispatcher.getStore('filters').getState()[param];
        if(!id) {
            return true;
        }
        return parseInt(id) === counter.id;
    },

    handlePageChange: function(page) {
        this.actions.changeSearchFilter({
            page: page
        });
    },

    handleSortChange: function(value) {
        this.actions.changeSearchFilter({
            sortBy: value
        });
    },

    toggleTilesView: function(state) {
        this.setState({isTilesView: state});
    },
    render: function() {
        var self = this;
        var cx = React.addons.classSet;
        var searchResultsClasses = cx({
            'search-results': true,
            'search-results_type_tiles': this.state.isTilesView
        });

        var activeTileClasses = cx({
            'btn btn_type_second': this.state.isTilesView,
            'btn btn_type_second btn_state_active': !this.state.isTilesView
        });

        var deactiveTileClasses = cx({
            'btn btn_type_second': !this.state.isTilesView,
            'btn btn_type_second btn_state_active': this.state.isTilesView
        });

        var results = this.dispatcher.getStore('results').getState();
        var counters = this.dispatcher.getStore('counters').getState();
        var filters = this.dispatcher.getStore('filters').getState();

        var postsPerPage = 20;

        return (
            <div>
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <h1 className="page-title page-title_small">Search results</h1>
                    </div>
                    <div className="grid__item ten-twelfths">
                        <SearchSimpleForm dispatcher={this.dispatcher} actions={this.actions} value={this.getQuery().query} />
                    </div>
                </div>
                <div className="results-form">
                    <header className="results-form__header">
                        <div className="grid">
                            <div className="grid__item two-twelfths">

                            </div>
                            <div className="grid__item ten-twelfths">
                                <div className="input-group">
                                    <div className="input-group">
                                        <button type="button"
                                            className={activeTileClasses}
                                            onClick={this.toggleTilesView.bind(this, false)}>
                                            <i className="btn__icon btn__icon_list"></i>
                                        </button>
                                        <button type="button"
                                            className={deactiveTileClasses}
                                            onClick={this.toggleTilesView.bind(this, true)}>
                                            <i className="btn__icon btn__icon_tiles"></i>
                                        </button>
                                    </div>
                                    <span className="input-group__item">
                                        <span className="input-group__item-title">Sort by</span>
                                        <ReactSelectize
                                            items={this.sortItems}
                                            value={filters.sortBy}
                                            onChange={this.handleSortChange}
                                            selectId="select-sortby"
                                            placeholder=" "
                                            label=" "
                                        />
                                    </span>
                                    <span className="input-group__item">
                                        <span className="input-group__item-title">Export to</span>
                                        <ReactSelectize
                                            items={[
                                                { name: "txt", id: "txt" },
                                                { name: "xml", id: "xml" },
                                                { name: "html", id: "html"}
                                            ]}
                                            value={0}
                                            onChange={this.handleExportChange}
                                            selectId="select-export"
                                            placeholder=" "
                                            label=" "
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="grid">
                        <div className="grid__item two-twelfths">
                            <nav className="nav-block">
                                <span className="nav-block__title">Refine by assets</span>
                                <ul className="nav-block__list">
                                    {counters.assetTypes.filter(this.filterCounters.bind(this, 'assetType'))
                                        .map(function(counter) {
                                            return <RefinementLink
                                                        actions={self.actions}
                                                        type="assetType"
                                                        filters={filters}
                                                        key={counter.id}
                                                        data={counter}/>;
                                        })}
                                </ul>
                            </nav>
                            <nav className="nav-block">
                                <span className="nav-block__title">Refine by taxonomies</span>
                                <ul className="nav-block__list">
                                    {counters.taxonomies.filter(this.filterCounters.bind(this, 'taxonomy'))
                                        .map(function(counter) {
                                            return <RefinementLink
                                                        actions={self.actions}
                                                        type="taxonomy"
                                                        filters={filters}
                                                        key={counter.id}
                                                        data={counter}/>;
                                        })}
                                </ul>
                            </nav>
                            <nav className="nav-block">
                                <span className="nav-block__title">Search result report</span>
                                <ul className="nav-block__list">
                                    <li className="nav-block__item"><span>Detailed</span></li>
                                    <li className="nav-block__item"><span>Compact</span></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="grid__item ten-twelfths">
                            <div className={searchResultsClasses}>
                                <header className="search-results__header">
                                    <span className="search-results__header-item search-results__header-item_name">Assets path</span>
                                    <span className="search-results__header-item search-results__header-item_category">Category</span>
                                    <span className="search-results__header-item search-results__header-item_attr">Attributes set</span>
                                    <span className="search-results__header-item search-results__header-item_link">Go to result</span>
                                </header>
                                <ul className="search-results__list">
                                    {results.models.map(function(result) {
                                        return <ResultItem
                                                    key={result.indexUid}
                                                    model={result}
                                                    searchId={results.searchId} />;
                                    })}
                                </ul>
                                {counters.totalCount
                                    ? <ResultPagination currentPage={filters.page} totalCount={counters.totalCount} postsPerPage={postsPerPage} onPageChanged={this.handlePageChange}/>
                                    : <div/>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
});
module.exports = ResultPage;
