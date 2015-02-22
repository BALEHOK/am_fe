/**
 * @jsx React.DOM
 */

var React = require('react');
var moment = require('moment');
var RevisionCell = require('./revisionCell.jsx');

var RevisionRow = React.createClass({

    render() {
        var revision = this.props.revision;
        var date = moment(revision.createdAt);
        var cells = revision.changedValues.map(el => <RevisionCell cell={el} />)
        return (
            <tr>
                <td width="11%">{revision.revisionNumber}</td>
                <td width="15%">
                    {date.format("DD.MM.YYYY")} <br/>
                    {date.format("hh:mm:ss A")} <br/>
                    <a href="#">Admin</a>
                </td>
                <td width="68%" colSpan="3">
                    {cells}
                </td>
                <td width="6%">
                    <a className="link link_second" href="#"><span className="icon icon_eye"></span></a>
                </td>
            </tr>
        );
    }
});

module.exports = RevisionRow;
