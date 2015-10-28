var Flux = require('delorean').Flux;
var LoginStore = require('../stores/LoginStore');

var LoginDispatcher = Flux.createDispatcher({
  
  authorize(token) {
    return this.dispatch('login:authorize', token);
  },

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
