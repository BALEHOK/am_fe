/**
 * @jsx React.DOM
 */

var React = require('react');
var moment = require('moment');

var AssetTypeRow = React.createClass({

    render: function() {
        var type = this.props.type;
        var date = moment(type.updateDate);
        return (
            <tr>
                <td>{type.displayName}</td>
                <td>{type.description}</td>
                <td>{type.revision}</td>
                <td>{date.format("DD.MM.YYYY")}</td>
            </tr>
        );
    }
});

module.exports = AssetTypeRow;