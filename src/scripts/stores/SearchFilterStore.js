var Flux = require('delorean').Flux;
var _ = require('underscore');

var SearchFilterStore = Flux.createStore({
  filter: {},

  actions: {
    'search:filter': 'applySearchFilter'
  },

  getState() {
    return this.filter;
  },

  applySearchFilter(filter) {
    this.filter = _.extends({}, this.filter, filter);
    this.emitChange();
  }
});

module.exports = SearchFilterStore;