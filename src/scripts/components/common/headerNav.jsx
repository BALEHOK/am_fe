/**
 * @jsx React.DOM
 */

var React = require('react');
var NavTab = require('./navTab');
var L20nMessage = require('../intl/l20n-message');

var HeaderNav = React.createClass({

    render: function() {
        return (
            <nav className="header-nav">
                <div className="container">
                    <ul className="header-nav__list">
                        <NavTab to="search">{L20nMessage('search', 'Search')}</NavTab>)
                        <NavTab to="reports">{L20nMessage('reports', 'Reports')}</NavTab>
                        <NavTab to="tasks">{L20nMessage('tasks', 'Tasks')}</NavTab>
                        <NavTab to="asset-create">{L20nMessage('assetCreate', 'New asset')} <span className="icon icon_plus"></span></NavTab>
                        <NavTab to="contact">{L20nMessage('contact', 'Contact')} <span className="icon icon_mail"></span></NavTab>
                        <NavTab to="faq">{L20nMessage('faq', 'FAQ')} <span className="icon icon_question"></span></NavTab>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = HeaderNav;
