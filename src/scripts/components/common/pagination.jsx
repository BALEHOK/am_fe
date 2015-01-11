/**
 * @jsx React.DOM
 */
var React = require('react');

function range(start, stop) {
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    var length = Math.max(stop - start, 0);
    var idx = 0;
    var arr = new Array(length);

    while(idx < length) {
        arr[idx++] = start;
        start += 1;
    }
    return arr;
}

var Pagination = React.createClass({
    propTypes: {
        numPages: React.PropTypes.number.isRequired,
        maxPages: React.PropTypes.number,
        handlePageChanged: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            maxPages: 5
        };
    },
    getInitialState: function() {
        var currentPage = typeof this.props.currentPage !== 'undefined' ? this.props.currentPage : 1;
        return {
            page: parseInt(currentPage)
        };
    },
    handlePageChanged: function(page) {
        if (page > this.props.numPages || page < 1) return;
        this.props.onPageChanged(page);
        this.setState({ page: page });
    },

    getDisplayCount: function() {
        if (this.props.numPages > this.props.maxPages) {
            return this.props.maxPages;
        }
        return this.props.numPages;
    },

    getPageRange: function() {
        var displayCount = this.getDisplayCount();
        var page = this.state.page;

        // Check position of cursor, zero based
        var idx = (page - 1) % displayCount;

        // list should not move if cursor isn't passed this part of the range
        var start = page - idx;

        // remaining pages
        var remaining = this.props.numPages - page;

        // Don't move cursor right if the range will exceed the number of pages
        // in other words, we've reached the home stretch
        if (page > displayCount && remaining < displayCount) {
            // add 1 due to the implementation of `range`
            start = this.props.numPages - displayCount + 1;
        }

        return range(start, start + displayCount);
    },

    preventDefault: function(e) {
        e.preventDefault();
    },

    render: function() {
        var page = this.state.page;
        var prevBtnClassName = page === 1 ? 'pagination__link pagination__link_disabled' : 'pagination__link';
        var firstBtnClassName = page <= this.props.maxPages ? 'pagination__link pagination__link_disabled' : 'pagination__link';
        var nextBtnClassName = page >= this.props.numPages ? 'pagination__link pagination__link_disabled' : 'pagination__link';
        var lastBtnClassName = page > (this.props.numPages - this.props.maxPages) ? 'pagination__link pagination__link_disabled' : 'pagination__link';

        return (
            <div className="pagination pull-right">
                <button className={firstBtnClassName} onClick={this.handlePageChanged.bind(this, 1)} title="First page">
                    <span className="icon icon_angle-d-left"></span>
                </button>
                <button className={prevBtnClassName} onClick={this.handlePageChanged.bind(this, page - 1)} title="Prev page">
                    <span className="icon icon_angle-left"></span>
                </button>
                <ul className="pagination__list">
                    {this.getPageRange().map(this.renderPage, this)}
                </ul>
                <button className={nextBtnClassName} onClick={this.handlePageChanged.bind(this, page + 1)} title="Next page">
                    <span className="icon icon_angle-right"></span>
                </button>
                <button className={lastBtnClassName} onClick={this.handlePageChanged.bind(this, this.props.numPages)} title="Last page">
                    <span className="icon icon_angle-d-right"></span>
                </button>
            </div>
        );
    },

    renderPage: function(n, i) {
        var cls = this.state.page === n ? 'pagination__link pagination__link_active' : 'pagination__link';
        return (
            <li key={i} className="pagination__item">
                <button className={cls} onClick={this.handlePageChanged.bind(this, n)}>{n}</button>
            </li>
        );
    }
});

module.exports = Pagination;
