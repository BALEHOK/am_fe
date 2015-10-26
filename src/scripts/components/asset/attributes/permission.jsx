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

const SECOND_TIER_ACTIVE = FIRST_TIER | COMMON_WRITE | FINANCE_READ;
const THIRD_TIER_ACTIVE = FIRST_TIER | FINANCE_READ;

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
        let SECOND_TIER_PARAM;
        let THIRD_TIER_PARAM;

        function isActive(indicator) {
            return indicator & value
        }

        function createCx(indicator) {
            return cx({
                'permissions-label_active': isActive(indicator),
                'permissions-label': true,
                'permissions-label_editable': self.props.editable
            });
        }

        if ((isActive(COMMON_WRITE) && !isActive(FINANCE_READ)) || (!isActive(COMMON_WRITE) && !isActive(FINANCE_READ))) {
            SECOND_TIER_PARAM = SECOND_TIER
        } else {
            SECOND_TIER_PARAM = SECOND_TIER_ACTIVE;
        }
        if (isActive(COMMON_WRITE)) {
            THIRD_TIER_PARAM = THIRD_TIER
        } else {
            THIRD_TIER_PARAM = THIRD_TIER_ACTIVE;
        }

        return (
            <div>
                <span onClick={this.props.onChange(FIRST_TIER, COMMON_READ)} className={createCx(COMMON_READ)}>R</span>
                <span onClick={this.props.onChange(SECOND_TIER_PARAM, COMMON_WRITE)} className={createCx(COMMON_WRITE)}>W</span>
                <span onClick={this.props.onChange(THIRD_TIER_PARAM, FINANCE_READ)} className={createCx(FINANCE_READ)}>R</span>
                <span onClick={this.props.onChange(FOURTH_TIER, FINANCE_WRITE)} className={createCx(FINANCE_WRITE)}>W</span>
            </div>
        );
    }
});

module.exports = Attribute;
