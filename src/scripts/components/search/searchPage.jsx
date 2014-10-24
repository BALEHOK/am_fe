/**
 * @jsx React.DOM
 */

var React = require('react');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var SearchSimpleForm = require('./searchSimpleForm');
var SearchComplexForm = require('./searchComplexForm.jsx');

var SearchPage = React.createClass({
    render: function() {
        return (
            <div>
                <h1 className="page-title">Search</h1>
                <TabbedArea defaultActiveKey={2} animation={false}>
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
