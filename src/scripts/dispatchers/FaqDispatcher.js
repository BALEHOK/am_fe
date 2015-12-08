var Flux = require('delorean').Flux;
var FaqStore = require('../stores/FaqStore');

var FaqDispatcher = Flux.createDispatcher({

    loadFaq() {
        return this.dispatch("faq:load");
    },

    getStores() {
      return {
        faq: new FaqStore(),
      }
    }

});

module.exports = FaqDispatcher;
