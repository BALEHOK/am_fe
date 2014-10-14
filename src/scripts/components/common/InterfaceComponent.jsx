/**
 * @jsx React.DOM
 */

var React = require('react');
var SearchPage = require('../search/main.jsx');

var InterfaceComponent = React.createClass({
    componentWillMount: function() {
        this.callback = (function() {
            this.forceUpdate();
        }).bind(this);

        this.props.router.on("route", this.callback);
    },
    componentWillUnmount: function() {
        this.props.router.off("route", this.callback);
    },
    render : function() {
        console.log(this.props.router.current);
        if (this.props.router.current == "tasks") {
            return <div>tasks</div>;
        }
        if (this.props.router.current == "categories") {
            return <div>categories</div>;
        }
        if (this.props.router.current == "documents") {
            return <div>documents</div>;
        }
        if (this.props.router.current == "financial") {
            return <div>financial</div>;
        }
        if (this.props.router.current == "reports") {
            return <div>reports</div>;
        }
        if (this.props.router.current == "reservations") {
            return <div>reservations</div>;
        }
        return <SearchPage />;
    }
});

module.exports = InterfaceComponent;