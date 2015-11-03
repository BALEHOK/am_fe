var Flux = require('delorean').Flux;
var ContactRepository = require('../services/ContactRepository');

var ContactStore = Flux.createStore({

    status: '',

    actions: {
      'contact:send': 'sendMessage',
    },

    initialize() {
      this.contactRepo = new ContactRepository();
    },

    sendMessage(data) {
        this.contactRepo.sendMessage(data);
    },

    getState() {
      return  {
        status: this.status,
      };
    }

});

module.exports = ContactStore;
