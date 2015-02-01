/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var ReactSelectize = require('../common/react-selectize');
var SearchSimpleForm = require('./searchSimpleForm');
var RefinementBlock = require('./refinement_block');
var ResultItem = require('./result_item');
var ResultPagination = require('./resultPagination.jsx');
var ResultHeaderPagination = require('./resultHeaderPagination.jsx');

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

        this.dispatcher.stores.results.onChange(this.syncUrl);
        this.actions.changeSearchFilter(this.getQuery());
    },

    componentWillUnmount: function() {
        var stores = this.dispatcher.stores;
        Object.keys(this.dispatcher.stores).map(function(store) {
            stores[store].listener.removeListener('change', this.forceUpdateBound);
        }.bind(this));
        this.dispatcher.stores.results.listener.removeListener('change', this.syncUrl);
    },

    syncUrl: function() {
        var filters = this.dispatcher.getStore('results').getState().filter;
        var clean = Object.keys(filters).reduce(function(acc, key) {
            if(filters[key]) {
                acc[key] = filters[key]
            }
            return acc;
        }, {});
        this.transitionTo('/search/result?' + $.param(clean));
    },

    filterCounters: function(param, counter) {
        var id = this.dispatcher.getStore('results').getState().filter[param];
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

        var results = this.dispatcher.getStore('results').getState();
        var counters = results.counters;
        var filters = results.filter;

        var blockNav = results.loadingResults || results.loadingCounters ? true : false;

        var cx = React.addons.classSet;
        var searchResultsClasses = cx({
            'search-results': true,
            'search-results_type_tiles': this.state.isTilesView,
            'loading': results.loadingResults
        });

        var activeTileClasses = cx({
            'btn btn_type_second': this.state.isTilesView,
            'btn btn_type_second btn_state_active': !this.state.isTilesView
        });

        var deactiveTileClasses = cx({
            'btn btn_type_second': !this.state.isTilesView,
            'btn btn_type_second btn_state_active': this.state.isTilesView
        });

        var assetTypeRefinements = counters.assetTypes.filter(this.filterCounters.bind(this, 'assetType'));
        var taxonomyRefinements = counters.taxonomies.filter(this.filterCounters.bind(this, 'taxonomy'));

        var postsPerPage = 20;
        var pages = Math.ceil(counters.totalCount / postsPerPage);
        var currentPage = typeof filters.page !== 'undefined' ? parseInt(filters.page) : 1;
        var firstShowedItem = (currentPage-1) * postsPerPage + 1;
        var lastShowedItem = counters.totalCount < (currentPage*postsPerPage) ? counters.totalCount : currentPage*postsPerPage;

        return (
            <div>
                {results.loadingResults || results.loadingCounters
                  ? <div className="loader"></div>
                  : {}
                }
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <h1 className="page-title page-title_small">Search results</h1>
                    </div>
                    <div className="grid__item ten-twelfths">
                        {this.getQuery().query
                          ?  <SearchSimpleForm
                                dispatcher={this.dispatcher}
                                actions={this.actions}
                                value={this.getQuery().query}/>
                          : {}
                        }
                    </div>
                </div>
                <div className="results-form">
                    <header className="results-form__header">
                        <div className="grid grid_right">
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
                                {counters.totalCount
                                    ? <ResultHeaderPagination pages={pages}
                                                              currentPage={currentPage}
                                                              firstShowedItem={firstShowedItem}
                                                              totalCount={counters.totalCount}
                                                              lastShowedItem={lastShowedItem}
                                                              onPageChanged={this.handlePageChange}/>
                                    : <div/>
                                    }
                            </div>
                        </div>
                    </header>
                    <div className="grid">
                        <div className="grid__item two-twelfths">
                            {assetTypeRefinements.length !== 0
                                ? <RefinementBlock
                                    title="Refine by assets"
                                    list={assetTypeRefinements}
                                    type="assetType"
                                    actions={self.actions}
                                    filters={filters}
                                    maxItems={7}
                                    loading={blockNav}/>
                                : {}
                            }
                            {taxonomyRefinements.length !== 0
                                ? <RefinementBlock
                                    title="Refine by taxonomies"
                                    list={taxonomyRefinements}
                                    type="taxonomy"
                                    actions={self.actions}
                                    filters={filters}
                                    maxItems={7}
                                    loading={blockNav}/>
                                : {}
                            }
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
                                    {results.models.length !== 0
                                        ? results.models.map(function(result) {
                                            return <ResultItem
                                                    key={result.indexUid}
                                                    model={result}
                                                    searchId={results.searchId} />
                                          })
                                        : {}
                                    }
                                    {results.models.length === 0 && results.loadingResults === false
                                        ? <li className="search-results__item search-results__item_empty"><span className="search-results__item-msg"><strong>Nothing was found</strong> for the specified search parameters</span></li>
                                        : {}
                                    }
                                </ul>
                                {counters.totalCount
                                    ? <ResultPagination pages={pages}
                                                        currentPage={currentPage}
                                                        firstShowedItem={firstShowedItem}
                                                        totalCount={counters.totalCount}
                                                        lastShowedItem={lastShowedItem}
                                                        postsPerPage={postsPerPage}
                                                        onPageChanged={this.handlePageChange}/>
                                    : {}
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
