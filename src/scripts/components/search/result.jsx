﻿/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Pagination = require('./pagination');

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
    loadResultFromServer: function(query, page) {
        var self = this;
        var app = this.props.app;
        app.searchService
           .search(query, page)
           .done(function(data) {
               self.setState({ results: data });
               console.log(data);
           })
           .error(function(data) {
               console.log('TODO: handle error', data);
           });
    },
    getInitialState: function() {
        return {
            page: 1,
            results: []
        };
    },
    componentDidMount: function() {
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
    render: function() {
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
                                    <li className="nav-block__item"><span className="link link_second">Address <span className="light-grey">(308)</span></span></li>
                                    <li className="nav-block__item"><span className="link link_second">AssetTest <span className="light-grey">(2)</span></span></li>
                                    <li className="nav-block__item"><span className="link link_second">Bank account <span className="light-grey">(1)</span></span></li>
                                    <li className="nav-block__item"><span className="link link_second">Beamer <span className="light-grey">(1)</span></span></li>
                                    <li className="nav-block__item"><span className="link link_second">Building <span className="light-grey">(3)</span></span></li>
                                    <li className="nav-block__item"><span className="link link_second">Expense note details <span className="light-grey">(1)</span></span></li>
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
                                <Pagination onPageChanged={this.handlePageChange} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
});
module.exports = ResultPage;
