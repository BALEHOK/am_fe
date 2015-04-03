var Flux = require('delorean').Flux;
var HistoryRepository = require('../services/HistoryRepository');

var HistoryStore = Flux.createStore({

    history: {
        revisions: []
    },

    loading: false,

    actions: {
        'history:load': 'loadHistory'
    },

    initialize() {
        this.historyRepo = new HistoryRepository();
    },

    loadHistory(params) {
        this.loading = true;
        this.historyRepo.loadHistory(params).then((result) => {
            this.history = result;
            this.loading = false;
            this.emitChange();
        });
    },

    getState() {
        return {
            value: this.history,
            loading: this.loading
        };
    }
});

module.exports = HistoryStore;