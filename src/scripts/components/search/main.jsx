/**
 * @jsx React.DOM
 */

var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var SearchSimpleForm = require('./searchSimpleForm');
var SearchComplexForm = require('./searchComplexForm.jsx');

var SearchPage = React.createClass({
    mixins: [AuthenticatedRouteMixin],
    render: function() {
        return (
            <div>
                <h1 className="page-title">Search</h1>
                <TabbedArea defaultActiveKey={1} animation={false}>
                    <TabPane key={1} tab="Simple">
                        <SearchSimpleForm/>        
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
