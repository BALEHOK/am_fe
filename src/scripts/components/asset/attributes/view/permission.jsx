/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = React.addons.classSet;

var Attribute = React.createClass({
    render: function() {
        var value = parseInt(this.props.params.value);
        function createCx(indicator) {
            return cx({
                'permissions-label_active': indicator & value,
                'permissions-label': true
            });
        }

        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">permissions:</span>
                <span className={createCx(0b1000)}>R</span>
                <span className={createCx(0b100)}>W</span>
                <span className={createCx(0b10)}>R</span>
                <span className={createCx(0b1)}>W</span>
            </div>
        );
    }
});

module.exports = Attribute;