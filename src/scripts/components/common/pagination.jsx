/**
 * @jsx React.DOM
 */

var React = require('react');

var Pagination = React.createClass({
    handlePageChanged: function(page) {
        this.props.onPageChanged(page);
    },
    render: function() {
        return (
            <div className="pagination-row clearfix">
                <span className="pagination-row__title">Showing 1 - 10 from {this.props.totalCount}</span>
                <div className="pagination pull-right">
                    <ul className="pagination__list">
                        <li className="pagination__item">
                            <a className="pagination__link pagination__link_active" onClick={this.handlePageChanged.bind(this, 1)}>1</a>
                        </li>
                        <li className="pagination__item">
                            <a className="pagination__link" onClick={this.handlePageChanged.bind(this, 2)}>2</a>
                        </li>
                        <li className="pagination__item">
                            <a className="pagination__link" onClick={this.handlePageChanged.bind(this, 3)}>3</a>
                        </li>
                        <li className="pagination__item">
                            <a className="pagination__link" onClick={this.handlePageChanged.bind(this, 4)}>4</a>
                        </li>
                        <li className="pagination__item">
                            ...
                        </li>
                        <li className="pagination__item">
                            <a href="#" className="pagination__link">98</a>
                        </li>
                    </ul>
                    <a href="#" className="pagination__link"><span className="icon icon_angle-right"></span></a>
                    <a href="#" className="pagination__link"><span className="icon icon_angle-d-right"></span></a>
                </div>
            </div>

        );
    }
});

module.exports = Pagination;
