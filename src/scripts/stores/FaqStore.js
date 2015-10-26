var Flux = require('delorean').Flux;
var FaqRepository = require('../services/FaqRepository');

var FaqStore = Flux.createStore({

    list: [],

    actions: {
      'faq:load': 'loadFaq',
    },

    initialize() {
      this.faqRepo = new FaqRepository();
    },

    loadFaq() {
        this.faqRepo.loadFaq().then((data) => {
          this.list = data;
          this.emitChange();
        });
    },

    getState() {
      return  {
        list: this.list,
      };
    }

});

module.exports = FaqStore;
