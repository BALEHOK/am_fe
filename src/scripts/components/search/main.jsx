/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var Tabs = require('react-simpletabs');
var SearchSimpleForm = require('./simpleForm/searchSimpleForm');
var SearchComplexForm = require('./complexForm/searchComplexForm.jsx');

var SearchDispatcher = require('../../dispatchers/SearchDispatcher');
var SearchMainActions = require('../../actions/SearchMainActions');

import SearchComplexFormDispatcher from '../../dispatchers/SearchComplexFormDispatcher';
import SearchComplexFormActions from '../../actions/SearchComplexFormActions';

var SearchPage = React.createClass({
    mixins: [AuthenticatedRouteMixin],

    contextTypes: {
        router: React.PropTypes.func
    },

    displayName: 'Search',

    componentWillMount: function() {
        this.dispatcher = SearchDispatcher;
        this.actions = new SearchMainActions(this.dispatcher);

        this.complexDispatcher = SearchComplexFormDispatcher;
        this.complexActions = new SearchComplexFormActions(this.complexDispatcher);
    },

    handleSimpleSearch: function(query) {
        this.context.router.transitionTo('/search/result', {}, {'query' : query});
    },
    render: function() {
        return (
            <div>
                <h1 className="page-title">Search</h1>
                <Tabs defaultActiveKey={1} animation={false}>
                    <Tabs.Panel eventKey={1} title="Simple">
                        <SearchSimpleForm changeFilter={this.actions.changeSearchFilter.bind(this.actions)} dispatcher={this.dispatcher} />
                    </Tabs.Panel>
                    <Tabs.Panel eventKey={2} title="By type">
                        <SearchComplexForm actions={this.complexActions} dispatcher={this.complexDispatcher} />
                    </Tabs.Panel>
                </Tabs>
            </div>
      );
    }
});
module.exports = SearchPage;
