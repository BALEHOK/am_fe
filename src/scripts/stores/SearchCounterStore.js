var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');

var SearchCounterStore = Flux.createStore({
  counters: {},

  actions: {
    'search:counters': 'loadSearchCounters'
  },

  initialize() {
    this.searchRepo = new SearchRepository();
  },

  getState() {
    return this.counters;
  },

  loadSearchCounters(searchId) {
    this.searchRepo.counters(searchId).then((data) => {
      this.counters = data;
      this.emitChange();
    });
  }
});

module.exports = SearchCounterStore;