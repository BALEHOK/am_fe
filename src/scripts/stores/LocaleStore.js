var Flux = require('delorean').Flux;

var LocaleStore = Flux.createStore({

    locale: '',
    ctx: document.l10n,//L20n.getContext(),
    ready: false,

    actions: {
        'locale:change': 'changeLocale',
    },

    initialize() {
        let self = this;
        this.ctx.addEventListener('ready', function() {
            self.ready = true;
            self.emitChange();
            console.log(self.ctx.supportedLocales);
        });
    },

    changeLocale(locale) {
        this.ctx.requestLocales(locale);
    },

    getState() {
        return {
            locale: this.locale,
            ctx: this.ctx,
            ready: this.ready
        };
    }

});

module.exports = LocaleStore;
