var LoginStore = require('../stores/LoginStore.js');

var AuthenticatedRouteMixin = {
    statics: {
        willTransitionTo: function (transition, params, query) {
            if (!LoginStore.store.isLoggedIn()) {
              localStorage['nextPath'] = transition.path;
            } else if (localStorage['nextPath']) {
              if (transition.path != '/'){
                // something interesting is happening. don't interrupt
                localStorage['nextPath'] = '';
                return;
              }

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
