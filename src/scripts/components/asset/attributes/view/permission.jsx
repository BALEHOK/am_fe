/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var Permission = require('../permission');

var Attribute = React.createClass({

    render: function() {
        var params = this.props.params;
        return (
            <div className="asset-data__param" data-param-id={params.id}>
                <span className="asset-data__param-title">permissions:</span>
                <Permission params={params} />
            </div>
        );
    }
});

module.exports = Attribute;
