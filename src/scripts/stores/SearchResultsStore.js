var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');

var SearchResultsStore = Flux.createStore({
  models: [],
  tracking: undefined,
  searchId: undefined,

  actions: {
    'search:results': 'loadResults',
    'search:tracking': 'loadSearchTracking',
  },

  initialize() {
    this.searchRepo = new SearchRepository();
  },

  getState() {
    return {
      models: this.models,
      searchId: this.searchId,
      tracking: this.tracking,
    };
  },

  loadResults(filters) {
    this.searchRepo.search(filters).then((data) => {
      this.models = data.entities;
      this.searchId = data.searchId;
      this.emitChange();
    })
  },

  loadSearchTracking(searchId) {
    this.searchRepo.tracking(searchId).then((data) => {      
      this.tracking = data;
      this.emitChange();
    });
  },

});

module.exports = SearchResultsStore;