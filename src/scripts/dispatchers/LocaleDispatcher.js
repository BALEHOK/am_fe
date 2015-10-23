var Flux = require('delorean').Flux;
var LocaleStore = require('../stores/LocaleStore');

var LocaleDispatcher = Flux.createDispatcher({

    changeLocale(locale) {
        return this.dispatch("locale:change", locale);
    },

    getStores() {
      return {
        locale: new LocaleStore(),
      }
    }

});

module.exports = LocaleDispatcher;
