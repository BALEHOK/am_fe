/**
 * @jsx React.DOM
 */

var React = require('react');
var NavTab = require('./navTab');
var TranslatedMessage = require('../intl/TranslatedMessage');

var HeaderNav = React.createClass({

    render: function() {
        return (
            <nav className="header-nav">
                <div className="container">
                    <ul className="header-nav__list">
                        <NavTab to="search"><TranslatedMessage messageId="search"/></NavTab>)
                        <NavTab to="reports"><TranslatedMessage messageId="reports"/></NavTab>
                        <NavTab to="asset-create"><TranslatedMessage messageId="assetCreate"/> <span className="icon icon_plus"></span></NavTab>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = HeaderNav;
