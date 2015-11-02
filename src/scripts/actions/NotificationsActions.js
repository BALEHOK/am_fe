var Actions = require('./Actions');

class NotificationsActions extends Actions {

    show(params) {
      return this._dispatcher.show(params);
    }

    clear(params) {
      return this._dispatcher.clear();
    }

}

module.exports = NotificationsActions;
