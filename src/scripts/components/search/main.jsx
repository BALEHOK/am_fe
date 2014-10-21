/**
 * @jsx React.DOM
 */

var React = require('react');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');

var SearchSimpleForm = require('./searchSimpleForm');
var SimpleSearch = require('../../models/SimpleSearch').SimpleSearch;
var model = new SimpleSearch();

var SearchPage = React.createClass({
    render: function() {
        return (
            <div>
                <h1 className="page-title">Search</h1>
                <TabbedArea defaultActiveKey={1} animation={false}>
                    <TabPane key={1} tab="Simple">
                        <SearchSimpleForm model={model} />        
                    </TabPane>
                    <TabPane key={2} tab="By type">TabPane 2 content</TabPane>
                </TabbedArea>
            </div>
      );
    }
});
module.exports = SearchPage;
