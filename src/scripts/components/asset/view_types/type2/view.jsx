/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('./panel');

var AssetViewType2 = React.createClass({
    handleScreenChange: function() {

    },
    render: function() {
        var panels = this.props.screen.panels.map(function(el) {
            return <Panel data={el} title={el.name}/>
        });

        return (
            <div className="grid">
                {panels}
            </div>
        );
    }
});
module.exports = AssetViewType2;
