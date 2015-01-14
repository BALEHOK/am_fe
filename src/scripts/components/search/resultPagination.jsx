/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');
var Pagination = require('../common/pagination');

var ResultPagination = React.createClass({
    render: function() {
        return (
            <div className="pagination-row clearfix">
                <span className="pagination-row__title">Showing {this.props.firstShowedItem} - {this.props.lastShowedItem} from {this.props.totalCount}</span>
                <Pagination currentPage={this.props.currentPage} numPages={this.props.pages} onPageChanged={this.props.onPageChanged}/>
            </div>
        );
    }
});

module.exports = ResultPagination;
