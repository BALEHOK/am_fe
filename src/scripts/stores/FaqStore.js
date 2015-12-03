var Flux = require('delorean').Flux;
var FaqRepository = require('../services/FaqRepository');

var FaqStore = Flux.createStore({

    list: [],
    id: null,

    actions: {
      'faq:load': 'loadFaq',
      'faq:loadId': 'loadFaqId',
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

    loadFaqId() {
        this.faqRepo.loadFaqId().then((id) => {
          this.id = id;
          this.emitChange();
        });
    },

    getState() {
      return  {
        list: this.list,
        id: this.id,
      };
    }

});

module.exports = FaqStore;
