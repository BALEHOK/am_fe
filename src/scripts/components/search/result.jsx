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
var ReportsBlock = require('./reportsBlock');
var Loader = require('../common/loader.jsx');
var LoaderMixin = require('../../mixins/LoaderMixin');
var Flux = require('delorean').Flux;
var cx = require('classnames');

var ResultPage = React.createClass({
    mixins: [Router.Navigation, LoaderMixin, Flux.mixins.storeListener],
    contextTypes: {
        router: React.PropTypes.func
    },
    sortItems: [
        { name: "Rank", id: 0 },
        { name: "Date", id: 1 },
        { name: "Location", id: 2 },
        { name: "User", id: 3 },
    ],
    exportItems: [
        'txt',
        'xml',
        'xlsx'
    ],
    getInitialState: function() {
        var query = this.context.router.getCurrentQuery();
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

    componentDidMount: function() {
        this.actions = this.props.actions;
        this.props.dispatcher.stores.results.onChange(this.syncUrl);
        this.loadData(this.context.router.getCurrentQuery());
    },

    loadData: function(filters, updateCounters = true) {
        var res = this.actions.changeSearchFilter(filters);
        this.waitFor(res);
        if(updateCounters) {
            this.startWaiting('loadingCounters',
                res.then(() => this.actions.fetchSearchCounters()));
        }
    },

    syncUrl: function() {
        var filters = this.state.stores.results.filter;
        var clean = Object.keys(filters).reduce(function(acc, key) {
            if(filters[key]) {
                acc[key] = filters[key]
            }
            return acc;
        }, {});
        this.context.router.transitionTo('/search/result?' + $.param(clean));
    },

    filterCounters: function(param, counter) {
        var id = this.state.stores.results.filter[param];
        if(!id) {
            return true;
        }
        return parseInt(id) === counter.id;
    },

    handlePageChange: function(page) {
        var searchId = this.state.stores.results.searchId;
        this.loadData({
            page: page,
            searchId: searchId
        }, false);
    },

    handleSortChange: function(value) {
        this.loadData({
            sortBy: value[0].id
        }, false);
    },

    handleExportClick: function(format) {
        var searchId = this.state.stores.results.searchId;
        this.actions.exportSearchResults({
           searchId: searchId,
           format: format
        });
    },

    toggleTilesView: function(state) {
        this.setState({isTilesView: state});
    },

    render: function() {
        var self = this;

        var results = this.state.stores.results;
        var counters = results.counters;
        var filters = results.filter;

        var searchResultsClasses = cx({
            'search-results': true,
            'search-results_type_tiles': this.state.isTilesView,
        });

        var activeTileClasses = cx({
            'btn btn_type_second': this.state.isTilesView,
            'btn btn_type_second btn_state_active': !this.state.isTilesView
        });

        var deactiveTileClasses = cx({
            'btn btn_type_second': !this.state.isTilesView,
            'btn btn_type_second btn_state_active': this.state.isTilesView
        });

        var navBlockClasses = cx({
            'nav-block': true,
        });

        var assetTypeRefinements = counters.assetTypes.filter(this.filterCounters.bind(this, 'assetType'));
        var taxonomyRefinements = counters.taxonomies.filter(this.filterCounters.bind(this, 'taxonomy'));

        var postsPerPage = 20;
        var pages = Math.ceil(counters.totalCount / postsPerPage);
        var currentPage = typeof filters.page !== 'undefined' ? parseInt(filters.page) : 1;
        var firstShowedItem = (currentPage-1) * postsPerPage + 1;
        var lastShowedItem = counters.totalCount < (currentPage*postsPerPage) ? counters.totalCount : currentPage*postsPerPage;

        var urlQuery = this.context.router.getCurrentQuery();
        var isHistory = urlQuery.context == 2;

        return (
            <div>
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <h1 className="page-title page-title_small">Search results</h1>
                    </div>
                    <div className="grid__item ten-twelfths">
                        {this.context.router.getCurrentQuery().query
                          ?  <SearchSimpleForm
                                dispatcher={this.props.dispatcher}
                                changeFilter={this.loadData}
                                value={urlQuery.query}
                                context={urlQuery.context} />
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
                            <Loader loading={this.state.loadingCounters}>
                                <div>
                                    {assetTypeRefinements.length !== 0
                                        ? <RefinementBlock
                                            title="Refine by assets"
                                            list={assetTypeRefinements}
                                            type="assetType"
                                            changeFilter={self.loadData}
                                            filters={filters}
                                            maxItems={7}
                                            navBlockClasses={navBlockClasses}/>
                                        : {}
                                    }
                                    {taxonomyRefinements.length !== 0
                                        ? <RefinementBlock
                                            title="Refine by taxonomies"
                                            list={taxonomyRefinements}
                                            type="taxonomy"
                                            changeFilter={self.loadData}
                                            filters={filters}
                                            maxItems={7}
                                            navBlockClasses={navBlockClasses}/>
                                        : {}
                                    }
                                    <nav className={navBlockClasses}>
                                        <ReportsBlock searchId={results.searchId} />
                                    </nav>
                                    <nav className={navBlockClasses}>
                                        <span className="nav-block__title">Export</span>
                                        <ul className="nav-block__list">
                                            {this.exportItems.map(function(format){
                                                return <li className="nav-block__item">
                                                            <a className="link link_second" onClick={this.handleExportClick.bind(this, format)}>
                                                                <span className="icon icon_download"></span>.{format}
                                                            </a>
                                                        </li>;
                                            }, this)}
                                        </ul>
                                    </nav>
                                </div>
                            </Loader>
                        </div>
                        <div className="grid__item ten-twelfths">
                            <Loader loading={this.state.loading} >
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
                                                        searchId={results.searchId}
                                                        isHistory={isHistory} />
                                              })
                                            : {}
                                        }
                                        {results.models.length === 0 && this.state.loading === false
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
                            </Loader>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
});
module.exports = ResultPage;
