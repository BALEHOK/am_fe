/**
 * @jsx React.DOM
 */

var React = require('react');
var moment = require('moment');

var Attribute = React.createClass({

    getInitialState: function() {
        return { currentdate: moment() };
    },

    componentDidMount: function() {
        this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function() {
        clearInterval(this.timer);
    },

    tick: function() {
        this.setState({ currentdate: moment() });
    },

    render: function() {
        return (
            <div className="asset-data__param" data-param-id={this.props.params.id}>
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <span className="asset-data__param-content">
                    {this.state.currentdate.format('DD-MM-YYYY HH:mm:ss')}
                </span>
            </div>
        );
    }
});

module.exports = Attribute;
