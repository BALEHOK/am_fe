/**
 * @jsx React.DOM
 */

var React = require('react');

var AttributesFactory = require('../../attributesFactory');

var Panel = React.createClass({
    render: function() {
        var attrs = this.props.data.attributes.map((attr) => {
            return AttributesFactory.getViewAttribute(attr.datatype, attr, this.props.dispatcher);
        });
        return (
            <div>
                {attrs}
            </div>
        );
    }
});

module.exports = Panel;
