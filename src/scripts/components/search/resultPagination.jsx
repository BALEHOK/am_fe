/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');
var Pagination = require('../common/pagination');

var ResultPagination = React.createClass({
    render: function() {

        var totalCount = parseInt(this.props.totalCount);
        var postPerPage = parseInt(this.props.postsPerPage);

        var pages = Math.ceil(totalCount / postPerPage);
        var maxPages = 5;

        var currentPage = typeof this.props.currentPage !== 'undefined' ? parseInt(this.props.currentPage) : 1;
        var firstShowedItem = (currentPage-1) * postPerPage + 1;
        var lastShowedItem = totalCount < (currentPage*postPerPage) ? totalCount : currentPage*postPerPage;

        return (
            <div className="pagination-row clearfix">
                <span className="pagination-row__title">Showing {firstShowedItem} - {lastShowedItem} from {totalCount}</span>
                <Pagination currentPage={currentPage} maxPages={maxPages} numPages={pages} onPageChanged={this.props.onPageChanged}/>
            </div>

        );
    }
});

module.exports = ResultPagination;
