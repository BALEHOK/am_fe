var Actions = require('./Actions');

class FaqActions extends Actions {

    loadFaq() {
        return this._dispatcher.loadFaq();
    }

}

module.exports = FaqActions;
