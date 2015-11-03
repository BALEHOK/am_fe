var Flux = require('delorean').Flux;

var NotificationsStore = Flux.createStore({

    notification: {},

    actions: {
      'notifications:show': 'show',
      'notifications:clear': 'clear',
    },

    show(params) {
        this.notification = params;
        this.emitChange();
    },

    clear(params) {
        this.notification = {};
        this.emitChange();
    },

    getState() {
        return  {
            notification: this.notification
        }
    }
})

module.exports = NotificationsStore;
