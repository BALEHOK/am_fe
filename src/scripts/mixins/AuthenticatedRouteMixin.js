var LoginPage = require('../components/login/main.jsx');
var AuthService = require('../services/AuthService.js');

var AuthenticatedRouteMixin = {
    statics: {
        willTransitionTo: function (transition, params, query) {
            if (!window.app.tokenStore.getToken()) {
                if (location.href.indexOf('localhost') > 0)
                    transition.redirect('login', {}, {'nextPath' : transition.path});
                else
                    location.href = '/login';
            }
        }
    }
};

module.exports = AuthenticatedRouteMixin;