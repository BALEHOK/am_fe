/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var ReactSelectize = require('../common/react-selectize');
var SearchSimpleForm = require('./simple/searchSimpleForm');
var RefinementBlock = require('./refinement_block');
var ResultItem = require('./result_item');
var ResultPagination = require('./resultPagination.jsx');
var ResultHeaderPagination = require('./resultHeaderPagination.jsx');
var ReportsBlock = require('./reportsBlock');
var Loader = require('../common/loader.jsx');
var LoaderMixin = require('../../mixins/LoaderMixin');
var Flux = require('delorean').Flux;
var cx = require('classnames');
import {param} from "../../util/util";
import SearchQueryDisplay from './byType/searchQueryDisplay';
import L20nMessage from '../intl/l20n-message';

var ResultPage = React.createClass({
    mixins: [Router.Navigation, LoaderMixin, Flux.mixins.storeListener],

    watchStores: ['results', 'report', 'login'],

    contextTypes: {
        router: React.PropTypes.func
    },

    exportItems: [
        'txt',
        'xml',
        'xlsx'
    ],

    searchId: 0,

    isSearchByType: function(){
        return !!this.props.byType;
    },

    getInitialState: function() {
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

        var promise = this.actions.setSearchFilter(this.context.router.getCurrentQuery());
        this.doSearch(promise);
    },

    componentWillUnmount: function() {
        this.props.dispatcher.stores.results.listener.removeListener('change', this.syncUrl);
    },

    loadData: function(filters, updateCounters = true) {
        var promise = this.actions.changeSearchFilter(filters);
        this.doSearch(promise, updateCounters);
    },

    doSearch: function(changeFilterPromise, updateCounters = true){
        var resultsPromise = changeFilterPromise.then(() => {
            if (this.isSearchByType()){
                return this.actions.searchResultsByType();
            }

            return this.actions.searchResults();
        });

        this.waitFor(resultsPromise);

        if(updateCounters) {
            this.startWaiting('loadingCounters',
                resultsPromise.then(() => {
                    this.actions.fetchSearchCounters();
                    var assetType = this.state.stores.results.filter.assetType;
                    if (assetType) {
                        this.actions.fetchCustomReportsByType(assetType);
                    } else {
                        this.actions.resetCustomReports();
                    }
            }));
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
        var router = this.context.router;
        router.transitionTo(router.getCurrentPathname() + '?' + param(clean));
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
        var searchError = results.error;
        var searchErrorMsg = results.errorMsg;

        var sortItems = [
            { name: L20nMessage('searchResultsSortByRank', 'Rank'), id: 0 },
            { name: L20nMessage('searchResultsSortByDate', 'Date'), id: 1 },
            { name: L20nMessage('searchResultsSortByLocation', 'Location'), id: 2 },
            { name: L20nMessage('searchResultsSortByUser', 'User'), id: 3 },
        ];

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

        var assetTypeRefinements = this.isSearchByType()
            ? []
            : counters.assetTypes.filter(this.filterCounters.bind(this, 'assetType'));

        var taxonomyRefinements = counters.taxonomies.filter(this.filterCounters.bind(this, 'taxonomy'));

        var postsPerPage = 20;
        var pages = Math.ceil(counters.totalCount / postsPerPage);
        var currentPage = typeof filters.page !== 'undefined' ? parseInt(filters.page) : 1;
        var firstShowedItem = (currentPage-1) * postsPerPage + 1;
        var lastShowedItem = counters.totalCount < (currentPage*postsPerPage) ? counters.totalCount : currentPage*postsPerPage;

        var urlQuery = this.context.router.getCurrentQuery();
        var isHistory = urlQuery.context == 2;

        var assetTypeName, attributes;
        if (!this.state.stores.results.searchByTypeModel){
            assetTypeName = '';
            attributes = [];
        } else {
            assetTypeName = this.state.stores.results.searchByTypeModel.assetType.name;
            attributes = this.state.stores.results.searchByTypeModel.attributes;
        }

        return (
            <div>
                <div className="grid results-grid">
                    <div className="grid__item two-twelfths">
                        <h1 className="page-title page-title_small">{L20nMessage('searchResultsTitle', 'Search results')}</h1>
                    </div>
                    <div className="grid__item ten-twelfths">
                        {!this.isSearchByType()
                          ?  <SearchSimpleForm
                                dispatcher={this.props.dispatcher}
                                changeFilter={this.loadData}
                                value={urlQuery.query}
                                context={urlQuery.context} />
                          : <div>
                                <div>
                                    <SearchQueryDisplay
                                        typeName={assetTypeName}
                                        attributes={attributes} />
                                </div>
                                <div>
                                    <Link to="type-search" query={{ searchId: urlQuery.searchId }}>
                                        edit search
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="results-form">
                    {!searchError
                        ? <header className="results-form__header">
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
                                            <span className="input-group__item-title">{L20nMessage('searchResultsSort', 'Sort by')}</span>
                                            <ReactSelectize
                                                items={sortItems}
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
                        : null
                    }
                    <div className="grid">
                        <div className="grid__item two-twelfths">
                            <Loader loading={this.state.loadingCounters}>
                                <div>
                                    {assetTypeRefinements.length !== 0 && !searchError
                                        ? <RefinementBlock
                                            title={L20nMessage('searchResultsRefineAssets', 'Refine by assets')}
                                            list={assetTypeRefinements}
                                            type="assetType"
                                            changeFilter={self.loadData}
                                            filters={filters}
                                            maxItems={7}
                                            navBlockClasses={navBlockClasses}/>
                                        : {}
                                    }
                                    {taxonomyRefinements.length !== 0 && !searchError
                                        ? <RefinementBlock
                                            title={L20nMessage('searchResultsRefineTax', 'Refine by taxonomies')}
                                            list={taxonomyRefinements}
                                            type="taxonomy"
                                            changeFilter={self.loadData}
                                            filters={filters}
                                            maxItems={7}
                                            navBlockClasses={navBlockClasses}/>
                                        : {}
                                    }
                                    {!searchError
                                        ? <nav className={navBlockClasses}>
                                            <ReportsBlock searchId={results.searchId} reports={this.state.stores.report.reports} />
                                          </nav>
                                        : null
                                    }
                                    {!searchError && this.state.stores.login.user.isAdmin
                                        ? <nav className={navBlockClasses}>
                                            <span className="nav-block__title">{L20nMessage('searchResultsExport', 'Export')}</span>
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
                                        : null
                                    }
                                </div>
                            </Loader>
                        </div>
                        <div className="grid__item ten-twelfths">
                            <Loader loading={this.state.loading} >
                                <div className={searchResultsClasses}>
                                    <header className="search-results__header">
                                        <span className="search-results__header-item search-results__header-item_name">{L20nMessage('searchResultsColumnName', 'Name')}</span>
                                        <span className="search-results__header-item search-results__header-item_category">{L20nMessage('searchResultsColumnCategory', 'Category')}</span>
                                        <span className="search-results__header-item search-results__header-item_attr">{L20nMessage('searchResultsColumnAttr', 'Attributes set')}</span>
                                        <span className="search-results__header-item search-results__header-item_link">{L20nMessage('searchResultsColumnLink', 'Go to result')}</span>
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
                                        {results.models.length === 0 && this.state.loading === false && !searchError
                                            ? <li className="search-results__item search-results__item_empty">
                                                <span className="search-results__item-msg">
                                                    {L20nMessage('searchResultsNotFound', 'Nothing was found for the specified search parameters')}
                                                </span>
                                              </li>
                                            : {}
                                        }
                                        {results.models.length === 0 && this.state.loading === false && searchError
                                            ? <li className="search-results__item search-results__item_empty">
                                                <span className="search-results__item-msg">
                                                    {searchErrorMsg}
                                                </span>
                                               </li>
                                            : {}
                                        }
                                    </ul>
                                    {counters.totalCount && !searchError
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
