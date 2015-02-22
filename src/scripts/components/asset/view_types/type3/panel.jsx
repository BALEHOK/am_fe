
var React = require('react');

var AttributesFactory = require('../../attributesFactory');
var TabPane = require('react-bootstrap/TabPane');

var Panel = React.createClass({
    render: function() {
        var attrs = this.props.data.attributes.map(function(attr) {
            return AttributesFactory.getViewAttribute(attr.datatype, attr);
        });
        return (
            <div>
                {attrs}
            </div>
        );
    }
});

module.exports = Panel;