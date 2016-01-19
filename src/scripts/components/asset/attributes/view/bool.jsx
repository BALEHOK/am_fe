/**
 * @jsx React.DOM
 */

var React = require('react');

var Attribute = React.createClass({
    render: function() {
        var value = this.props.params.value === 'True' ? true : undefined;
        var params = this.props.params;
        return (
            <div className="asset-data__param" data-param-id={params.id}>
                <span className="asset-data__param-title">{params.name}:</span>
                <span className="asset-data__param-content">
                    <label className="checkbox">
                        <input type="checkbox" className="checkbox__input" name="checkbox1" checked={value} disabled/>
                        <span className="checkbox__icon"></span>
                    </label>
                </span>
            </div>
        );
    }
});

module.exports = Attribute;
