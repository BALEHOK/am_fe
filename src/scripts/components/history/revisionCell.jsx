/**
 * @jsx React.DOM
 */

var React = require('react');
var moment = require('moment');

var RevisionCell = React.createClass({

    render() {
        var cell = this.props.cell;
        return (
            <div className="field-cell">
                <span className="field-cell__name">[{cell.name}]</span>
                <span className="field-cell__value">
                    {cell.newValue}
                </span>
                <span className="field-cell__value field-cell__value_old">
                    {cell.oldValue}
                </span>
            </div>
        );
    }
});

module.exports = RevisionCell;
