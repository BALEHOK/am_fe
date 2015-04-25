/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var Permission = require('../permission');

var Attribute = React.createClass({

    render: function() {

        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">permissions:</span>
                <Permission params={this.props.params} />
            </div>
        );
    }
});

module.exports = Attribute;