﻿/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');
var Pagination = require('../common/pagination');
var Link = Router.Link;
var ReactSelectize = require('../common/react-selectize');

var RefinementLink = React.createClass({
    render: function() {
        return (
            <li className="nav-block__item">
                <a onClick={this.props.onRefinementChanged.bind(this, this.props.key)} className="link link_second">{this.props.data.name}&nbsp;
                <span className="light-grey">({this.props.data.count})</span></a>
            </li>
        );
    }
});

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

var ResultPage = React.createClass({
    mixins: [Router.Navigation],
    sortItems: [
        { name: "Rank", id: 0 },
        { name: "Date", id: 1 },
        { name: "Location", id: 2 },
        { name: "User", id: 3 },
    ],
    getInitialState: function() {
        return {
            page: this.props.query.page,
            assetType: this.props.query.assetType,
            taxonomy: this.props.query.taxonomy,
            sortBy: this.props.query.sortBy,
            searchId: null,
            counters: {
                totalCount: null,
                assetTypes: [],
                taxonomies: []
            },
            isTilesView: false
        };
    },
    loadResultFromServer: function(query, page, assetType, taxonomy, sortBy) {
        AppDispatcher.dispatch({
            action: 'search',
            data: {
                query:query,
                page:page,
                assetType:assetType,
                taxonomy:taxonomy,
                sortBy:sortBy
            }});
    },
    componentDidMount: function() {
        var self = this;
        this.props.SearchStore.on("all", function(){
            self.forceUpdate();
        });
        this.props.SearchCounterStore.on("all", function(){
            self.forceUpdate();
        });
        this.props.SearchStore.OnSearchDone.on(function(searchId){
            AppDispatcher.dispatch({
                action: 'search-counters',
                data: {
                    query: self.props.query.query,
                    searchId: searchId,
                }});
        });
    },
    componentWillUnmount: function() {
        this.props.SearchStore.off(null, null, this);
    },
    componentWillMount: function() {
        this.loadResultFromServer(
            this.props.query.query,
            this.props.query.page,
            this.props.query.assetType,
            this.props.query.taxonomy,
            this.props.query.sortBy);
    },
    componentWillUpdate: function(nextProps, nextState) {
        var params = this.props.query;
        if (nextState.page)
            params.page = nextState.page;
        if (nextState.assetType)
            params.assetType = nextState.assetType;
        if (nextState.taxonomy)
            params.taxonomy = nextState.taxonomy;
        if (nextState.sortBy)
            params.sortBy = nextState.sortBy;
        this.transitionTo('result', {}, params);
    },
    handlePageChange: function(page) {
        this.setState({page: page});
        this.loadResultFromServer(this.props.query.query, page);
    },
    handleRefinementChange: function(refinement, id) {
        // TODO add optimistic refinements update.
        // i.e. on click hide all others and left only selected one
        if (refinement == 'assetType') {
            this.setState({ assetType: id });
            this.loadResultFromServer(
                this.props.query.query,
                this.state.page,
                id,
                this.state.taxonomy,
                this.state.sortBy);
        } else {
            this.setState({ taxonomy: id });
            this.loadResultFromServer(
                this.props.query.query,
                this.state.page,
                this.state.assetType,
                id,
                this.state.sortBy);
        }
    },
    handleSortChange: function(value) {
        var newSort = value;
        this.setState({sortBy: newSort});
        this.loadResultFromServer(
            this.props.query.query,
            this.state.page,
            this.state.assetType,
            this.state.taxonomy,
            newSort);
    },
    handleExportChange: function(value) {

    },
    setTilesView: function() {
        this.setState({isTilesView: true});
    },
    unsetTilesView: function() {
        this.setState({isTilesView: false});
    },
    render: function() {
        var self = this;
        var cx = React.addons.classSet;
        var searchResultsClasses = cx({
            'search-results': true,
            'search-results_type_tiles': this.state.isTilesView
        });
        return (
            <div>
                <h1 className="page-title">Results page</h1>
                <div className="results-form">
                    <header className="results-form__header">
                        <div className="grid">
                            <div className="grid__item two-twelfths">

                            </div>
                            <div className="grid__item ten-twelfths">
                                <div className="input-group">
                                    <div className="input-group">
                                        <button type="button"
                                            className={
                                                this.state.isTilesView
                                                    ? 'btn btn_type_second'
                                                    : 'btn btn_type_second btn_state_active'
                                                }
                                            onClick={this.unsetTilesView}>
                                            <i className="btn__icon btn__icon_list"></i>
                                        </button>
                                        <button type="button"
                                            className={
                                                this.state.isTilesView
                                                    ? 'btn btn_type_second btn_state_active'
                                                    : 'btn btn_type_second'}
                                            onClick={this.setTilesView}>
                                            <i className="btn__icon btn__icon_tiles"></i>
                                        </button>
                                    </div>
                                    <span className="input-group__item">
                                        <span className="input-group__item-title">Sort by</span>
                                        <ReactSelectize
                                            items={this.sortItems}
                                            value={parseInt(this.getInitialState().sortBy)}
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
                                    {this.props.SearchCounterStore.assetTypes.map(function(counter) {
                                        return <RefinementLink
                                                    onRefinementChanged={self.handleRefinementChange.bind(self, 'assetType')}
                                                    key={counter.id}
                                                    data={counter} />;
                                    })}
                                </ul>
                            </nav>
                            <nav className="nav-block">
                                <span className="nav-block__title">Refine by taxonomies</span>
                                <ul className="nav-block__list">
                                    {this.props.SearchCounterStore.taxonomies.map(function(counter) {
                                        return <RefinementLink
                                                    onRefinementChanged={self.handleRefinementChange.bind(self, 'taxonomy')}
                                                    key={counter.id}
                                                    data={counter} />;
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
                                    {this.props.SearchStore.models.map(function(result) {
                                        return <ResultItem
                                                    key={result.get('indexUid')}
                                                    model={result}
                                                    searchId={self.props.SearchStore.currentSearchId} />;
                                    })}
                                </ul>
                                {this.props.SearchCounterStore.totalCount
                                    ? <Pagination totalCount={this.props.SearchCounterStore.totalCount}
                                                onPageChanged={this.handlePageChange} />
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
