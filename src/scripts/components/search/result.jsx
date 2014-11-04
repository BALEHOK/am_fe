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
        return (
            <li className="search-results__item">
                <span className="search-results__item-param search-results__item-param_name"><a>{this.props.data.name}</a></span>
                <span className="search-results__item-param search-results__item-param_category"></span>
                <span className="search-results__item-param search-results__item-param_attr">
                    <span className="search-results__item-attr">
                    {this.props.data.allAttribValues}
                    </span>
                </span>
                <span className="search-results__item-param search-results__item-param_link">
                    <a className="#"><span className="icon icon_angle-right"></span></a>
                </span>
            </li>
        );
    }
});

var ResultPage = React.createClass({
    mixins: [Backbone.React.Component.mixin, Router.Navigation],
    getInitialState: function() {
        return {
            page: 1,
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
    loadResultFromServer: function(query, page) {
        var self = this;
        var app = this.props.app;
        app.searchService
           .search(query, page)
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
        this.loadResultFromServer(this.props.query.query, this.props.query.page);
    },    
    handlePageChange: function(page) {
        this.setState({page: page, results: []});
        this.loadResultFromServer(this.props.query.query, page);
        this.transitionTo('result', {}, {
            query: this.props.query.query, 
            page: page
        });        
    },
    handleRefinementChange: function(refinement, id) {
        console.log(refinement, id);
    },
    render: function() {
        var self = this;
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
                                    <select>
                                        <option value="rank">Rank</option>
                                        <option value="rank">Rank</option>
                                        <option value="rank">Rank</option>
                                        <option value="rank">Rank</option>
                                    </select>
                                </label>
                                <label>
                                    Export to
                                    <select>
                                        <option value="rank">txt</option>
                                        <option value="rank">xml</option>
                                        <option value="rank">html</option>
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
                                        return <ResultItem key={result.indexUid} data={result}/>;
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
