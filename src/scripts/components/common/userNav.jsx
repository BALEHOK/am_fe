import React from 'react';
import {Link} from 'react-router';

var UserNav = React.createClass({
    render: function() {
        return (
            <div className="user-nav">
                <a href="/MySettings.aspx" className="user-nav__pic">
                    <img src={this.props.user.userpicPath} alt=""/>
                </a>
                <a className="user-nav__profile-link" href="/MySettings.aspx">{this.props.user.userName}</a>
                <span className="user-nav__actions">
                    <Link className="user-nav__actions-item user-nav__actions-item_icon_settings" to="admin" title="Dashboard"></Link>
                    <a className="user-nav__actions-item user-nav__actions-item_icon_logout" onClick={this.props.onLogout} title="Logout"></a>
                </span>
                <span className="user-nav__login-date">Last login: {this.props.user.lastLogin.format('dddd, D MMMM YYYY HH:mm:ss')}</span>
            </div>
        );
    }
});

export default UserNav;
