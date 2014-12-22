var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');

var SearchResultsStore = Flux.createStore({
  models: [],

  searchId: undefined,

  actions: {
    'search:results': 'loadResults'
  },

  initialize() {
    this.searchRepo = new SearchRepository();
  },

  getState() {
    return {
      models: this.models,
      searchId: this.searchId
    };
  },

  loadResults(filters) {
    this.searchRepo.search(filters).then((data) => {
      this.models = data.entities;
      this.searchId = data.searchId;
      this.emitChange();
    })
  }
});

module.exports = SearchResultsStore;