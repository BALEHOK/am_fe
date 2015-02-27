/**
 * @jsx React.DOM
 */

var React = require('react');
var DateTimeField = require('react-datetimepicker');
var moment = require('moment');

var DateTimeAttribute = React.createClass({
    render: function() {
        return (
            <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <label className="input-txt input-txt_size_small">
                	<DateTimeField selectedDate={moment(this.props.params.value)}/>
            	</label>
            </div>
        );
    }
});

module.exports = DateTimeAttribute;