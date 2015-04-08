var Flux = require('delorean').Flux;
var SearchStore = require('../stores/SearchStore');

var SearchDispatcher = Flux.createDispatcher({

  applySearchFilters(filter) {
    return this.dispatch('search:filter', filter);
  },

  searchResults(filters) {
    return this.dispatch('search:results', filters);
  },

  getCounters(searchId, query, context) {
    return this.dispatch('search:counters', {
      searchId: searchId,
      query: query,
      context: context
    });
  },

  getStores() {
    return {
      results: new SearchStore()
    }
  }
});

module.exports = SearchDispatcher;
