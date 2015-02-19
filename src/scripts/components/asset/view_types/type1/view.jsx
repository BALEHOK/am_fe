/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('./panel');
// var Router = require('react-router');
// var Link = Router.Link;

var AssetViewType1 = React.createClass({
    render: function() {
        var panels = this.props.screen.panels.map(function(el) {
            return <Panel data={el} title={el.name}/>
        });

        return (
            <div>
                {panels}
            </div>
        );
    }
});
module.exports = AssetViewType1;
