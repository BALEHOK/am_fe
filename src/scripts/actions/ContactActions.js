var Actions = require('./Actions');

class ContactActions extends Actions {

    sendMessage(data) {
        return this._dispatcher.sendMessage(data);
    }
}

module.exports = ContactActions;
