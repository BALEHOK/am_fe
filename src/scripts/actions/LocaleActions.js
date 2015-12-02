var Actions = require('./Actions');

class LocaleActions extends Actions {

    changeLocale(locale) {
        return this._dispatcher.changeLocale(locale);
    }

}

export default LocaleActions;
