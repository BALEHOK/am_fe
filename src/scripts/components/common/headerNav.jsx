/**
 * @jsx React.DOM
 */

var React = require('react');
var NavTab = require('./navTab');

var HeaderNav = React.createClass({

    render: function() {
        return (
            <nav className="header-nav">
                <div className="container">
                    <ul className="header-nav__list">
                        <NavTab to="search">Search</NavTab>
                        <NavTab to="reports">Reports</NavTab>
                        <NavTab to="asset-create">New asset <span className="icon icon_plus"></span></NavTab>
                        <NavTab to="contact">Contact <span className="icon icon_mail"></span></NavTab>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = HeaderNav;
