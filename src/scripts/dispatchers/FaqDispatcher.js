var Flux = require('delorean').Flux;
var FaqStore = require('../stores/FaqStore');

var FaqDispatcher = Flux.createDispatcher({

    loadFaq() {
        return this.dispatch("faq:load");
    },

    loadFaqId() {
        return this.dispatch("faq:loadId");
    },

    getStores() {
      return {
        faq: new FaqStore(),
      }
    }

});

module.exports = FaqDispatcher;
