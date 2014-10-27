var LoginPage = require('../components/login/main.jsx');
var AuthService = require('../services/AuthService.ts').AuthService;

// https://github.com/rackt/react-router/blob/master/docs/api/components/RouteHandler.md#static-lifecycle-methods
var AuthenticatedRouteMixin = {
    statics: {
        willTransitionTo: function (transition, params, query) {
            //console.log('AuthenticatedRouteMixin', transition);
            var authService = new AuthService();
            var promise = authService.getAuthStatus();
            promise.then(function (loggedIn) {
                if (!loggedIn) {
                    // TODO : save target page and redirect back after login
                    // use transition.retry()
                    transition.redirect('/login');
                }
            });
            transition.wait(promise);
        }
    }
};

module.exports = AuthenticatedRouteMixin;