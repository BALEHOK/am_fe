/**
 * @jsx React.DOM
 */

var React = require('react');
var moment = require('moment');
var RevisionCell = require('./revisionCell.jsx');
var Link = require('react-router').Link;

var RevisionRow = React.createClass({

    render() {
        var revision = this.props.revision;
        var cells = revision.changedValues.map(el => <RevisionCell cell={el} />);
        return (
            <tr>
                <td width="11%">{revision.revisionNumber}</td>
                <td width="15%">
                    {revision.createdAt} <br/>
                    <a href="#">{revision.createdByUser.name}</a>
                </td>
                <td width="68%" colSpan="3">
                    {cells}
                </td>
                <td width="6%">
                    <Link className="link link_second"
                        to="asset-revision"
                        params={{
                            assetTypeId: revision.assetTypeId,
                            assetId: revision.assetId,
                            revision: revision.revisionNumber
                        }}>
                        <span className="icon icon_eye"></span>
                    </Link>
                </td>
            </tr>
        );
    }
});

module.exports = RevisionRow;
