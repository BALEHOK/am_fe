/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('./panel');

var AssetViewType1 = React.createClass({
    render: function() {
        var panels = this.props.screen.panels.map((el) => {
            return <Panel data={el} title={el.name} dispatcher={this.props.dispatcher}/>
        });

        return (
            <div>
                {panels}
            </div>
        );
    }
});
module.exports = AssetViewType1;
