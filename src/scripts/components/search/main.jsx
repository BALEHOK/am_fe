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

var SearchDispatcher = require('../../dispatchers/SearchDispatcher');
var SearchMainActions = require('../../actions/SearchMainActions');

var SearchPage = React.createClass({
    mixins: [AuthenticatedRouteMixin],

    componentWillMount: function() {
        this.dispatcher = SearchDispatcher;
        this.actions = new SearchMainActions(this.dispatcher);
    },

    handleSimpleSearch: function(query) {
        this.context.router.transitionTo('/search/result', {}, {'query' : query});
    },
    render: function() {
        return (
            <div>
                <h1 className="page-title">Search</h1>
                <TabbedArea defaultActiveKey={1} animation={false}>
                    <TabPane eventKey={1} tab="Simple">
                        <SearchSimpleForm changeFilter={this.actions.changeSearchFilter.bind(this.actions)} dispatcher={this.dispatcher} />
                    </TabPane>
                    <TabPane eventKey={2} tab="By type">
                        New version of Type Search is under development.
                        Please use the <a href="/Search/SearchByType.aspx">old version</a>.
                    </TabPane>
                </TabbedArea>
            </div>
      );
    }
});
module.exports = SearchPage;
