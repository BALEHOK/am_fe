/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var SearchSimpleForm = require('./searchSimpleForm');
var SearchComplexForm = require('./searchComplexForm.jsx');

var SearchPage = React.createClass({
    mixins: [AuthenticatedRouteMixin, Router.Navigation],
    handleSimpleSearch: function(query) {
        this.transitionTo('/search/result', {}, {'query' : query});
    },
    render: function() {
        return (
            <div>
                <h1 className="page-title">Search</h1>
                <TabbedArea defaultActiveKey={1} animation={false}>
                    <TabPane key={1} tab="Simple">
                        <SearchSimpleForm onQuerySubmit={this.handleSimpleSearch} />        
                    </TabPane>
                    <TabPane key={2} tab="By type">
                        <SearchComplexForm/>
                    </TabPane>
                </TabbedArea>
            </div>
      );
    }
});
module.exports = SearchPage;
