var Flux = require('delorean').Flux;
var ContactRepository = require('../services/ContactRepository');

var ContactStore = Flux.createStore({

    status: '',
    loading: false,

    actions: {
      'contact:send': 'sendMessage',
    },

    initialize() {
      this.contactRepo = new ContactRepository();
    },

    sendMessage(data) {
        this.loading = true;
        this.emitChange();
        this.contactRepo.sendMessage(data).then((data) => {
          this.loading = false;
          this.emitChange();
        });;
    },

    getState() {
      return  {
        status: this.status,
        loading: this.loading,
      };
    }

});

module.exports = ContactStore;
