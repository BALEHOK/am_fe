/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('./panel');
var Tabs = require('react-simpletabs');


var AssetViewType3 = React.createClass({
    handleScreenChange: function() {

    },
    render: function() {
        var i = 0;
        var panels = this.props.screen.panels.map((el) => {
            i++;
            return (
                <Tabs.Panel eventKey={i} tab={el.name}>
                    <Panel data={el} title={el.name} dispatcher={this.props.dispatcher}/>
                </Tabs.Panel>);
        });

        return (
            <div className="asset-data">
                <div className="asset-data__content">
                    <Tabs className="asset-data__tabs" defaultActiveKey={1} animation={false}>
                        {panels}
                    </Tabs>
                </div>
            </div>

        );
    }
});
module.exports = AssetViewType3;
