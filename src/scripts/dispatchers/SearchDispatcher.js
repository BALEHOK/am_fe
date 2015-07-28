var Flux = require('delorean').Flux;
var SearchStore = require('../stores/SearchStore');
var ReportStore = require('../stores/ReportStore');

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

  loadReports(assetTypeId) {
    return this.dispatch('reports:load', assetTypeId);
  },

  getStores() {
    return {
      results: new SearchStore(),
      report: new ReportStore(),
    }
  }
});

module.exports = SearchDispatcher;
