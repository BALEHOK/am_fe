var Actions = require('./Actions');

class FaqActions extends Actions {

    loadFaq() {
        return this._dispatcher.loadFaq();
    }

    loadFaqId() {
        return this._dispatcher.loadFaqId();
    }
}

module.exports = FaqActions;
