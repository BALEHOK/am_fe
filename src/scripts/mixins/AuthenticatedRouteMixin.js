var LoginPage = require('../components/login/main.jsx');

var AuthenticatedRouteMixin = {
    componentWillMount: function () {
        if (!this.props.session.authenticated) {
            console.log('not authenticated!');
        }
    },
    statics: {
        willTransitionTo: function (transition) {
            //transition.wait(this.promise);
            //console.log('willTransitionTo');
            //console.log(this.props.session);
            //transition.redirect('/login');
            //if (!auth.loggedIn()) {
            //    LoginPage.attemptedTransition = transition;
            //    transition.redirect('/login');
            //}
        }
    }
};

module.exports = AuthenticatedRouteMixin;