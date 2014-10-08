/**
 * @jsx React.DOM
 */

var React = require('react');

var Breadcrumbs = React.createClass({
    render: function() {
        return (
            <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                    <li className="breadcrumbs__item"><a className="breadcrumbs__item-link" href="#">App home</a></li>
                    <li className="breadcrumbs__item breadcrumbs__item_active"><span className="breadcrumbs__item-link">Search</span></li>
                </ul>
            </nav>
        );
    }
});

module.exports = Breadcrumbs;
