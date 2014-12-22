var Flux = require('delorean').Flux;
var _ = require('underscore');

var SearchFilterStore = Flux.createStore({
  filter: {
    sortBy: undefined,
    query: undefined,
    assetType: undefined,
    taxonomy: undefined,
    page: undefined
  },

  actions: {
    'search:filter': 'applySearchFilter'
  },

  getState() {
    return this.filter;
  },

  applySearchFilter(filter) {
    this.filter = _.extend({}, this.filter, filter);
    this.emitChange();
  }
});

module.exports = SearchFilterStore;