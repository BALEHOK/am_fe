var LoginStore = require('../stores/LoginStore.js');

var AuthenticatedRouteMixin = {
    statics: {
        willTransitionTo: function (transition, params, query) {
            if (!LoginStore.store.isLoggedIn()) {
              localStorage['nextPath'] = transition.path;
              transition.redirect('/login', {});
            } else if (localStorage['nextPath']) {
              let nextPath = localStorage['nextPath'];
              localStorage['nextPath'] = '';
              transition.redirect(nextPath, {});
            }
        }
    }
};

module.exports = AuthenticatedRouteMixin;
