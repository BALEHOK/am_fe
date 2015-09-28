var LoginStore = require('../stores/LoginStore.js');

var AuthenticatedRouteMixin = {
    statics: {
        willTransitionTo: function (transition, params, query) {
            var nextPath;
            if (!LoginStore.store.isLoggedIn()) {
              localStorage['nextPath'] = transition.path;
              transition.redirect('/login', {});
            } else if (nextPath = localStorage['nextPath']) {
              localStorage['nextPath'] = '';
              transition.redirect(nextPath, {});
            }
        }
    }
};

module.exports = AuthenticatedRouteMixin;
