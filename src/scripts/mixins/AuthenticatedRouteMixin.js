var LoginPage = require('../components/login/main.jsx');
var AuthService = require('../services/AuthService.js');

// https://github.com/rackt/react-router/blob/master/docs/api/components/RouteHandler.md#static-lifecycle-methods
var AuthenticatedRouteMixin = {
    statics: {
        willTransitionTo: function (transition, params, query) {  
            var authService = window.authService;
            var promise = authService.getAuthStatus();
            promise.then(function (loggedIn) {
                if (!loggedIn) {
                    if (location.href.indexOf('localhost') > 0)
                        transition.redirect('login');
                    else
                        location.href = '/login';
                }
            });
            transition.wait(promise);
        }
    }
};

module.exports = AuthenticatedRouteMixin;