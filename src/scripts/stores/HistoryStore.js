var Flux = require('delorean').Flux;
var HistoryRepository = require('../services/HistoryRepository');

var HistoryStore = Flux.createStore({

    history: {
        revisions: []
    },


    actions: {
        'history:load': 'loadHistory'
    },

    initialize() {
        this.historyRepo = new HistoryRepository();
    },

    loadHistory(params) {
        this.historyRepo.loadHistory(params).then((result) => {
            this.history = result;
            this.emitChange();
        });
    },

    getState() {
        return this.history;
    }
});

module.exports = HistoryStore;