/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        var value = this.props.params.value === 'True' ? true : undefined;
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <label className="checkbox">
                    <input type="checkbox" className="checkbox__input" name="checkbox1" checked={value} disabled/>
                    <span className="checkbox__icon"></span>
                </label>
            </div>
        );
    }
});

module.exports = Attribute;