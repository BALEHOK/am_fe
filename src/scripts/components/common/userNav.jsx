/**
 * @jsx React.DOM
 */

var React = require('react');

var UserNav = React.createClass({
    mixins: [Backbone.React.Component.mixin],
    onLogoutClick: function(){       
        var model = this.getModel();
        model.logout();
    },
    render: function() {        
        return (
            <div className="user-nav">
                <a href="#" className="user-nav__pic">
                    <img src={this.props.model.user.userpicPath} alt=""/>
                </a>
                <a className="user-nav__profile-link" href="#">{this.props.model.user.userName}</a>
                <span className="user-nav__actions">
                    <a className="user-nav__actions-item user-nav__actions-item_icon_settings" href="#" title="Settings"></a>                    
                    <a className="user-nav__actions-item user-nav__actions-item_icon_logout" href="#" onClick={this.onLogoutClick} title="Logout"></a>
                </span>
                <span className="user-nav__login-date">Last login: {this.props.model.user.lastLogin.format('HH:mm DD.MM.YYYY')}</span>
            </div>
        );
    }
});

module.exports = UserNav;
