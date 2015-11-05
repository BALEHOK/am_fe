var Flux = require('delorean').Flux;
var ContactStore = require('../stores/ContactStore');

var ContactDispatcher = Flux.createDispatcher({

    sendMessage(data) {
        return this.dispatch("contact:send", data);
    },

    getStores() {
      return {
        contact: new ContactStore(),
      }
    }

});

module.exports = ContactDispatcher;
