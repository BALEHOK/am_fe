var Flux = require('delorean').Flux;
var LocalesManifest = require('json!../../locales/browser.json');

var LocaleStore = Flux.createStore({

    currentLocale: null,
    ctx: document.l10n,
    ready: false,

    actions: {
        'locale:change': 'changeLocale',
    },

    initialize() {
        let self = this;
        this.ctx.addEventListener('ready', function() {
            self.ready = true;
            self.currentLocale = self.ctx.supportedLocales[0];
            self.emitChange();
        });
    },

    changeLocale(locale) {
        this.ready = false;
        this.emitChange();
        window.setTimeout(() => {
            this.ctx.requestLocales(locale);
        }, 1);
    },

    getState() {
        return {
            currentLocale: this.currentLocale,
            ctx: this.ctx,
            ready: this.ready
        };
    }

});

module.exports = LocaleStore;
