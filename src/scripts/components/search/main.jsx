/**
 * @jsx React.DOM
 */

var React = require('react');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var SearchSimpleForm = require('./searchSimpleForm');
var Layout = require('../common/layout.jsx');

var SearchPage = React.createClass({
    render: function() {
        console.log(this.props);
        return (
            <Layout user={this.props.model.currentUser}>
                <div>
                    <h1 className="page-title">Search</h1>
                    <TabbedArea defaultActiveKey={1} animation={false}>
                        <TabPane key={1} tab="Simple">
                            <SearchSimpleForm/>
                        </TabPane>
                        <TabPane key={2} tab="By type">TabPane 2 content</TabPane>
                    </TabbedArea>
                </div>
            </Layout>
      );
    }
});
module.exports = SearchPage;
