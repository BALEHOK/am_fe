var Flux = require('delorean').Flux;
var LoginStore = require('../stores/LoginStore');

var LoginDispatcher = Flux.createDispatcher({

  loginUser(token) {
    return this.dispatch('login:loginUser', token);
  },

  logoutUser() {
    return this.dispatch('login:logoutUser');
  },

  getStores() {
    return {
      login: LoginStore
    }
  }

});

module.exports = LoginDispatcher;
