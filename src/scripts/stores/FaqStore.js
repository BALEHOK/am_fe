var Flux = require('delorean').Flux;
var FaqRepository = require('../services/FaqRepository');

var FaqStore = Flux.createStore({

    list: [],
    id: null,

    actions: {
      'faq:load': 'loadFaq',
    },

    initialize() {
      this.faqRepo = new FaqRepository();
    },

    loadFaq() {
        this.faqRepo.loadFaq().then((data) => {
          this.list = data.items;
          this.id = data.faqAssetTypeId;
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
