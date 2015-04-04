var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');

var SearchResultsStore = Flux.createStore({
  models: [],
  searchId: undefined,

  counters: {
    assetTypes: [],
    taxonomies: [],
    totalCount: 0
  },

  filter: {
    sortBy: undefined,
    query: undefined,
    assetType: undefined,
    taxonomy: undefined,
    page: undefined,
    context: 1
  },

  actions: {
    'search:results': 'loadResults',
    'search:counters': 'loadSearchCounters',
    'search:filter': 'applySearchFilter'
  },

  initialize() {
    this.searchRepo = new SearchRepository();
  },

  getState() {
    return {
      models: this.models,
      searchId: this.searchId,
      counters: this.counters,
      filter: this.filter
    };
  },

  loadResults(filters) {
    this.searchRepo.search(filters)
        .done((data) => {
            this.models = data.entities;
            this.searchId = data.searchId;
        })
        .always((data) => {
            this.emitChange();
        })
  },

  loadSearchCounters(search) {
    this.searchRepo.counters(search)
        .done((data) => {
            this.counters = data;
        })
        .always((data) => {
            this.emitChange();
        })
  },

  applySearchFilter(filter) {
    this.filter = _.extend({}, this.filter, filter);
    this.emitChange();
  }

});

module.exports = SearchResultsStore;
