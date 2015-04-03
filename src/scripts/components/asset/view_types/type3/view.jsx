/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('./panel');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');


var AssetViewType3 = React.createClass({
    handleScreenChange: function() {

    },
    render: function() {
        var i = 0;
        var panels = this.props.screen.panels.map((el) => {
            i++;
            return (
                <TabPane eventKey={i} tab={el.name}>
                    <Panel data={el} title={el.name} dispatcher={this.props.dispatcher}/>
                </TabPane>);
        });

        return (
            <div className="asset-data">
                <div className="asset-data__content">
                    <TabbedArea className="asset-data__tabs" defaultActiveKey={1} animation={false}>
                        {panels}
                    </TabbedArea>
                </div>
            </div>

        );
    }
});
module.exports = AssetViewType3;
