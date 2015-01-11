/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');

var ResultPagination = React.createClass({
    propTypes: {
        handlePageChanged: React.PropTypes.func
    },
    getInitialState: function() {
        var currentPage = typeof this.props.currentPage !== 'undefined' ? this.props.currentPage : 1;
        return {
            page: parseInt(currentPage)
        };
    },
    componentWillReceiveProps: function() {
        this.setState({
            page: parseInt(this.props.currentPage)
        });
    },
    handlePageChanged: function(page) {
        if (page > this.props.numPages || page < 1) return;
        this.props.onPageChanged(page);
        this.setState({ page: page });
    },
    render: function() {

        var page = this.state.page;
        var prevBtnClassName = page === 1 ? 'short-pagination__btn short-pagination__btn_disabled' : 'short-pagination__btn';
        var nextBtnClassName = page >= this.props.pages ? 'short-pagination__btn short-pagination__btn_disabled' : 'short-pagination__btn';

        return (
            <div className="short-pagination pull-right">
                <span className="short-pagination__info">
                    {this.props.firstShowedItem} - {this.props.lastShowedItem} /  {this.props.totalCount}
                </span>
                <button className={prevBtnClassName} onClick={this.handlePageChanged.bind(this, page - 1)} title="Prev page">
                    <span className="icon icon_angle-left"></span>
                </button>
                <button className={nextBtnClassName} onClick={this.handlePageChanged.bind(this, page + 1)} title="Next page">
                    <span className="icon icon_angle-right"></span>
                </button>
            </div>
        );
    }
});

module.exports = ResultPagination;
