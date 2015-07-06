var AuthService = require('../services/AuthService.js');
var LoginStore = require('../stores/LoginStore.js');

var AuthenticatedRouteMixin = {
    statics: {
        willTransitionTo: function (transition, params, query) {
            if (!LoginStore.store.isLoggedIn()) {
               transition.redirect('/login', {}, {'nextPath' : transition.path});
            }
        }
    }
};

module.exports = AuthenticatedRouteMixin;
