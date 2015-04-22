/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');

var Attribute = React.createClass({

    getDefaultProps() {
        return {
            params: {},
            onChange: function() {},
            editable: false
        };
    },

    render: function() {
        var value = parseInt(this.props.params.value);
        var self = this;
        function createCx(indicator) {
            return cx({
                'permissions-label_active': indicator & value,
                'permissions-label': true,
                'permissions-label_editable': self.props.editable
            });
        }

        return (
            <div>
                <span onClick={this.props.onChange.bind(this, 0b1000)} className={createCx(0b1000)}>R</span>
                <span onClick={this.props.onChange.bind(this, 0b100)} className={createCx(0b100)}>W</span>
                <span onClick={this.props.onChange.bind(this, 0b10)} className={createCx(0b10)}>R</span>
                <span onClick={this.props.onChange.bind(this, 0b1)} className={createCx(0b1)}>W</span>
            </div>
        );
    }
});

module.exports = Attribute;