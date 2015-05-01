/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');

const COMMON_READ = 0b1000;
const COMMON_WRITE = 0b100;
const FINANCE_READ = 0b10;
const FINANCE_WRITE = 0b1;

const FIRST_TIER = COMMON_READ;
const SECOND_TIER = FIRST_TIER | COMMON_WRITE;
const THIRD_TIER = SECOND_TIER | FINANCE_READ;
const FOURTH_TIER = THIRD_TIER | FINANCE_WRITE;

var Attribute = React.createClass({

    getDefaultProps() {
        return {
            params: {},
            onChange: function() { return function() {}; },
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
                <span onClick={this.props.onChange(FIRST_TIER, COMMON_READ)} className={createCx(COMMON_READ)}>R</span>
                <span onClick={this.props.onChange(SECOND_TIER, COMMON_WRITE)} className={createCx(COMMON_WRITE)}>W</span>
                <span onClick={this.props.onChange(THIRD_TIER, FINANCE_READ)} className={createCx(FINANCE_READ)}>R</span>
                <span onClick={this.props.onChange(FOURTH_TIER, FINANCE_WRITE)} className={createCx(FINANCE_WRITE)}>W</span>
            </div>
        );
    }
});

module.exports = Attribute;
