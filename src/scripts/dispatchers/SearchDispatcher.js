var Flux = require('delorean').Flux;
var SearchResultsStore = require('../stores/SearchResultsStore');
var SearchFilterStore = require('../stores/SearchResultsStore');

module.exports = SearchDispatcher = Flux.createDispatcher({
  getStores: function() {
    return {
      results: new SearchResultsStore(),
      filters: new SearchFilterStore()
    }
  }
});