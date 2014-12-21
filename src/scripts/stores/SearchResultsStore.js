var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');

var SearchResultsStore = Flux.createStore({
  results: [],

  searchId: undefined,

  actions: {
    'search:results': 'loadResults'
  },

  initialize() {
    this.searchRepo = new SearchRepository();
  },

  getState() {
    return this.results;
  },

  loadResults(filters) {
    this.searchRepo.search(filters).then((data) => {
      this.results = data.entities;
      this.searchId = data.searchId;
      this.emitChange();
    })
  }
});

module.exports = SearchResultsStore;