/**
 * @jsx React.DOM
 */

var React = require('react');

var HeaderNav = React.createClass({
    render: function() {
        return (
            <nav className="header-nav">
                <div className="container">
                    <ul className="header-nav__list">
                        <li className="header-nav__item header-nav__item_state_active">
                            <a className="header-nav__item-link" href="#">Search</a>
                        </li>
                        <li className="header-nav__item">
                            <a className="header-nav__item-link" href="#">Tasks</a>
                        </li>
                        <li className="header-nav__item">
                            <a className="header-nav__item-link" href="#">Categories</a>
                            <a className="header-nav__item-link header-nav__item-link_icon_add" href="#" title="Add new category"></a>
                        </li>
                        <li className="header-nav__item">
                            <a className="header-nav__item-link" href="#">Documents</a>
                            <a className="header-nav__item-link header-nav__item-link_icon_add" href="#" title="Add new document"></a>
                        </li>
                        <li className="header-nav__item">
                            <a className="header-nav__item-link" href="#">Financial</a>
                            <a className="header-nav__item-link header-nav__item-link_icon_add" href="#"  title="Add new"></a>
                        </li>
                        <li className="header-nav__item">
                            <a className="header-nav__item-link" href="#">Reports</a>
                            <a className="header-nav__item-link header-nav__item-link_icon_add" href="#" title="Add new report"></a>
                        </li>
                        <li className="header-nav__item">
                            <a className="header-nav__item-link" href="#">Reservations</a>
                            <a className="header-nav__item-link header-nav__item-link_icon_add" href="#" title="Add new reservation"></a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = HeaderNav;
