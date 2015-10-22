var Flux = require('delorean').Flux;

var LocaleStore = Flux.createStore({

    locale: '';

    actions: {
        'locale:get': 'getLocale',
    },

    getLocale() {
      //this.filter = _.extend({}, this.filter, filter);
      this.emitChange();
    }

    getState() {
        return this.locale;
    }

});

module.exports = LocaleStore;
