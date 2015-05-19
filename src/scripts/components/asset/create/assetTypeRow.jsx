/**
 * @jsx React.DOM
 */

var React = require('react');
var moment = require('moment');

var AssetTypeRow = React.createClass({

    handleClick: function() {
        this.props.onClick(this.props.type);
    },

    render: function() {
        var type = this.props.type;
        var date = moment(type.updateDate);
        return (
            <tr onClick={this.handleClick} className="asset-create_row">
                <td><a>{type.displayName}</a></td>
                <td>{type.description}</td>
                <td>{type.revision}</td>
                <td>{date.format("DD.MM.YYYY")}</td>
                <td><a><span className="icon icon_chevron-right"></span></a></td>
            </tr>
        );
    }
});

module.exports = AssetTypeRow;