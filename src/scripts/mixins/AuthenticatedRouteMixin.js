var LoginStore = require('../stores/LoginStore.js').store;

var AuthenticatedRouteMixin = {
    statics: {
        willTransitionTo: function (transition, params, query) {
            if (!LoginStore.isLoggedIn()) {
              localStorage['nextPath'] = transition.path;
              transition.redirect('login');
            } else if (localStorage['nextPath']) {
              let nextPath = localStorage['nextPath'];
              localStorage['nextPath'] = '';
              if (nextPath != '/')
              {
                // do not redirect to root from root :-/
                transition.redirect(nextPath, {});
              }
            }
        }
    }
};

module.exports = AuthenticatedRouteMixin;
