/**
 * @jsx React.DOM
 */

var React = require('react');

var UserNav = React.createClass({
    render: function() {
        return (
            <div className="user-nav">
                <a href="#" className="user-nav__pic">
                    <img src="assets/images/girl_avatar.jpg" alt=""/>
                </a>
                <a className="user-nav__profile-link" href="#">Anni Huber</a>
                <span className="user-nav__actions">
                    <a className="user-nav__actions-item user-nav__actions-item_icon_settings" href="#" title="Settings"></a>
                    <a className="user-nav__actions-item user-nav__actions-item_icon_help" href="#" title="Help"></a>
                    <a className="user-nav__actions-item user-nav__actions-item_icon_msg" href="#" title="Messages"></a>
                </span>
                <span className="user-nav__login-date">Last login: 12:33 25.09.2014</span>
            </div>
        );
    }
});

module.exports = UserNav;
