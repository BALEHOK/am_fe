var LoginPage = require('../components/login/main.jsx');
var AuthService = require('../services/AuthService.js');

var AuthenticatedRouteMixin = {
    statics: {
        willTransitionTo: function (transition, params, query) {
            if (!window.app.tokenStore.getToken()) {
                transition.redirect('login', {}, {'nextPath' : transition.path});
            }
        }
    }
};

module.exports = AuthenticatedRouteMixin;
