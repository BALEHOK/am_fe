/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Pagination = require('./pagination');

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
    render: function() {
        console.log(this.props.data)
        var assetLink = '/Asset/View.aspx?assetTypeUID=' 
            + this.props.data.dynEntityUid 
            + '&assetUID='
            + this.props.data.dynEntityConfigUid 
            +'&SearchId='
            + this.props.searchId;
        return (
            <li className="search-results__item">
                <span className="search-results__item-param search-results__item-param_name"><a href={assetLink}>{this.props.data.name}</a></span>
                <span className="search-results__item-param search-results__item-param_category"></span>
                <span className="search-results__item-param search-results__item-param_attr">
                    <span className="search-results__item-attr">
                    {this.props.data.allAttribValues}
                    </span>
                </span>
                <span className="search-results__item-param search-results__item-param_link">
                    <a href={assetLink}><span className="icon icon_angle-right"></span></a>
                </span>
            </li>
        );
    }
});

var ResultPage = React.createClass({
    mixins: [Backbone.React.Component.mixin, Router.Navigation],
    getInitialState: function() {
        return {
            page: this.props.query.page,            
            assetType: this.props.query.assetType,
            taxonomy: this.props.query.taxonomy,
            sortBy: this.props.query.sortBy,
            searchId: null,
            results: [],
            counters: {
                totalCount: null,
                assetTypes: [],
                taxonomies: []
            },            
        };
    },
    loadCountersFromServer: function(searchId, query) {
        var self = this;
        var app = this.props.app;
        app.searchService
           .counters(searchId, query)
           .done(function(data) {
                self.setState({ counters: data });
            })
           .error(function(data) {
                // TODO
                console.log('TODO: handle error', data);
            });
    },
    loadResultFromServer: function(query, page, assetType, taxonomy, sortBy) {
        var self = this;
        var app = this.props.app;
        app.searchService
           .search(query, page, assetType, taxonomy, sortBy)
           .done(function(data) {
                self.loadCountersFromServer(data.searchId, query);
                self.setState({ results: data.entities, searchId: data.searchId });
           })
           .error(function(data) {
                // TODO
                console.log('TODO: handle error', data);
           });
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
        this.setState({page: page, results: []});
        this.loadResultFromServer(this.props.query.query, page);
    },
    handleRefinementChange: function(refinement, id) {
        // TODO add optimistic refinements update.
        // i.e. on click hide all others and left only selected one 
        this.setState({results:[]});
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
    handleSortChange: function(event) {
        var newSort = event.target.value;
        this.setState({sortBy: newSort, results: []});
        this.loadResultFromServer(
            this.props.query.query, 
            this.state.page,
            this.state.assetType,
            this.state.taxonomy,
            newSort);
    },
    render: function() {
        var self = this;
        var model = this.getModel();
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
                                    <button type="button" className="btn btn_type_second">
                                        <i className="btn__icon btn__icon_list"></i>
                                    </button>
                                    <button type="button" className="btn btn_type_second">
                                        <i className="btn__icon btn__icon_tiles"></i>
                                    </button>
                                </div>
                                <label>
                                    Sort by
                                    <select onChange={this.handleSortChange}>
                                        {model.SortByItems.map(function(item) {
                                          return <option key={item.id} value={item.id}>{item.name}</option>;
                                        })}
                                    </select>
                                </label>
                                <label>
                                    Export to
                                    <select>
                                        <option value="txt">txt</option>
                                        <option value="xml">xml</option>
                                        <option value="html">html</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </header>
                    <div className="grid">
                        <div className="grid__item two-twelfths">
                            <nav className="nav-block">
                                <span className="nav-block__title">Refine by assets</span>
                                <ul className="nav-block__list">
                                    {this.state.counters.assetTypes.map(function(counter) {
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
                                    {this.state.counters.taxonomies.map(function(counter) {
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
                            <div className="search-results">
                                <header className="search-results__header">
                                    <span className="search-results__header-item search-results__header-item_name">Assets path</span>
                                    <span className="search-results__header-item search-results__header-item_category">Category</span>
                                    <span className="search-results__header-item search-results__header-item_attr">Attributes set</span>
                                    <span className="search-results__header-item search-results__header-item_link">Go to result</span>
                                </header>
                                <ul className="search-results__list">
                                    {this.state.results.map(function(result) {
                                        return <ResultItem key={result.indexUid} data={result} searchId={self.state.searchId} />;
                                    })}
                                </ul>
                                {this.state.counters.totalCount
                                    ? <Pagination totalCount={this.state.counters.totalCount} 
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
