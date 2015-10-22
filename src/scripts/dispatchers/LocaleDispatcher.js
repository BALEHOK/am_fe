var Flux = require('delorean').Flux;
var LocaleStore = require('../stores/LocaleStore');

var LocaleDispatcher = Flux.createDispatcher({

    getLocale() {
        return this.dispatch("locale:get");
    },

    getStores() {
      return {
        locale: new LocaleStore(),
      }
    }

});

module.exports = LocaleDispatcher;
