var Actions = require('./Actions');

class LocaleActions extends Actions {

    getLocale() {
        return this._dispatcher.getLocale();
    }

}

export default LocaleActions;
