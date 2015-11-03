var Flux = require('delorean').Flux;
var NotificationsStore = require('../stores/NotificationsStore');

var NotificationsDispatcher = Flux.createDispatcher({

    show(params) {
        return this.dispatch('notifications:show', params);
    },

    clear(params) {
        return this.dispatch('notifications:clear');
    },

    getStores() {
      return {
        notifications: new NotificationsStore()
      }
    }

});

module.exports = NotificationsDispatcher;
