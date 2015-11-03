var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var LoginStore = require('../../stores/LoginStore').store;
var LoginActions = require('../../actions/LoginActions');
var NotificationsDispatcher = require('../../dispatchers/NotificationsDispatcher');
var NotificationsActions = require('../../actions/NotificationsActions');
var NotificationsContainer = require('../common/notificationsContainer');
var UserNav = require('./userNav');
var HeaderNav = require('./headerNav');
var Breadcrumbs = require('react-breadcrumbs');
var LocaleSwitcher = require('../intl/LocaleSwitcher');

var Layout = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    displayName: 'Home',

    componentWillMount: function() {
        this.dispatcher = NotificationsDispatcher;
        this.actions = new NotificationsActions(this.dispatcher);
    },

    handleLogout: function(){
        LoginActions.logoutUser();
    },

    render: function() {
        var isLoggedIn = LoginStore.isLoggedIn();
        var user = LoginStore.user;
        return (
            <div className="page-wrapper">
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="container">
                            <a className="page-header__logo hide-text" href="/">ACV CSC METEA</a>
                            <span className="page-header__banner hide-text">Asset Management</span>
                            <div className="page-header__user-nav pull-right">
                                {isLoggedIn ? <UserNav user={user} onLogout={this.handleLogout} /> : <div />}
                                <LocaleSwitcher/>
                            </div>
                        </div>
                    </div>
                    <div className="page-header__nav">
                        <HeaderNav {...this.props} />
                    </div>
                </header>
                <div className="page-content">
                    <div className="container" id="content">
                        <Breadcrumbs/>
                        <RouteHandler {...this.props} />
                    </div>
                </div>
                <NotificationsContainer
                    dispatcher={this.dispatcher}
                    actions={this.actions}
                />
            </div>
        );
    }
});

module.exports = Layout;
