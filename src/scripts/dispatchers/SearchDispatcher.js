var Flux = require('delorean').Flux;
var SearchResultsStore = require('../stores/SearchResultsStore');
var SearchFilterStore = require('../stores/SearchResultsStore');
var SearchCounterStore = require('../stores/SearchCounterStore');

var SearchDispatcher = Flux.createDispatcher({

  applySearchFilters(filter) {
    return this.dispatch('search:filter', filter);
  },

  searchResults(filters) {
    return this.dispatch('search:results', filters);
  },

  getCounters(searchId) {
    return this.dispatch('search:counters', searchId);
  },

  getStores() {
    return {
      results: new SearchResultsStore(),
      filters: new SearchFilterStore(),
      counters: new SearchCounterStore()
    }
  }
});

module.exports = SearchDispatcher;