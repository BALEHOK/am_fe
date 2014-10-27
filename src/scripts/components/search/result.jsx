/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');

var ResultItem = React.createClass({
    render: function() {
        return <li>{this.props.data.name}</li>;
    }
});

var ResultPage = React.createClass({
    mixins: [Backbone.React.Component.mixin, Router.Navigation],
    getInitialState: function() {
        return {
            results: []
        };
    },
    componentDidMount: function() {
        var self = this;
        var app = this.props.app;
        app.searchService
           .search(this.props.query.query)
           .done(function(data) {
               self.setState({ results: data });
               console.log(data);
           })
           .error(function(data) {
               console.log('TODO: handle error', data);
           });
    },
    render: function() {
        return (
            <div>
                <h1>Results page</h1>
                <ul>
                    {this.state.results.map(function(result) {
                        return <ResultItem key={result.indexUid} data={result}/>;
                    })}
                </ul>
            </div>
        );
    }
});
module.exports = ResultPage;