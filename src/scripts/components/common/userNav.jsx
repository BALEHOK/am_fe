/**
 * @jsx React.DOM
 */

var React = require('react');

var UserNav = React.createClass({
    render: function() {              
        return (
            <div className="user-nav">
                <a href="#" className="user-nav__pic">
                    <img src={this.props.user.userpicPath} alt=""/>
                </a>
                <a className="user-nav__profile-link" href="/MySettings.aspx">{this.props.user.userName}</a>
                <span className="user-nav__actions">
                    <a className="user-nav__actions-item user-nav__actions-item_icon_settings" href="/admin" title="Dashboard"></a>                    
                    <a className="user-nav__actions-item user-nav__actions-item_icon_logout" href="#" onClick={this.props.onLogout} title="Logout"></a>
                </span>
                <span className="user-nav__login-date">Last login: {this.props.user.lastLogin.format('HH:mm DD.MM.YYYY')}</span>
            </div>
        );
    }
});

module.exports = UserNav;
