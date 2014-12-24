var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');

var SearchCounterStore = Flux.createStore({
  counters: {
    assetTypes: [],
    taxonomies: [],
    totalCount: 0
  },

  actions: {
    'search:counters': 'loadSearchCounters'
  },

  initialize() {
    this.searchRepo = new SearchRepository();
  },

  getState() {
    return this.counters;
  },

  loadSearchCounters(search) {
    this.searchRepo.counters(search).then((data) => {
      this.counters = data;
      this.emitChange();
    });
  }
});

module.exports = SearchCounterStore;