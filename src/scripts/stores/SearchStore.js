var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');

var SearchResultsStore = Flux.createStore({
  loadingResults: undefined,
  loadingCounters: undefined,

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
    page: undefined
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
      loadingResults: this.loadingResults,
      loadingCounters: this.loadingCounters,
      models: this.models,
      searchId: this.searchId,
      counters: this.counters,
      filter: this.filter
    };
  },

  loadResults(filters) {
    this.loadingResults = true;
    this.emitChange();    
    this.searchRepo.search(filters)
        .done((data) => {
            this.models = data.entities;
            this.searchId = data.searchId;
            var search = {
                searchId: this.searchId,
                query: this.filter.query
            };
            this.loadSearchCounters(search);
        })
        .always((data) => {
            this.loadingResults = false;
            this.emitChange();
        })
  },

  loadSearchCounters(search) {
    this.loadingCounters = true;
    this.emitChange();

    this.searchRepo.counters(search)
        .done((data) => {
            this.counters = data;
        })
        .always((data) => {
            this.loadingCounters = false;
            this.emitChange();
        })
  },

  applySearchFilter(filter) {
    this.filter = _.extend({}, this.filter, filter);
    this.emitChange();
  }

});

module.exports = SearchResultsStore;
