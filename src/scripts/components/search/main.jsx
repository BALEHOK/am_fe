/**
 * @jsx React.DOM
 */

var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var SearchSimpleForm = require('./searchSimpleForm');

var SearchPage = React.createClass({
    mixins: [AuthenticatedRouteMixin],
    render: function() {
        return (
            <div>
                <h1 className="page-title">Search</h1>
                <TabbedArea defaultActiveKey={1} animation={false}>
                    <TabPane key={1} tab="Simple">
                        <SearchSimpleForm model={this.props.model} />        
                    </TabPane>
                    <TabPane key={2} tab="By type">TabPane 2 content</TabPane>
                </TabbedArea>
            </div>
      );
    }
});
module.exports = SearchPage;
