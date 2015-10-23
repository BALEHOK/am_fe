var Flux = require('delorean').Flux;
var LocalesManifest = require('json!../../locales/browser.json');

var LocaleStore = Flux.createStore({

    currentLocale: LocalesManifest.default_locale,
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
        this.ctx.requestLocales(locale);
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
