var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');

var SearchTrackingStore = Flux.createStore({
  tracking: undefined,

  actions: {
    'search:tracking': 'loadSearchTracking',
  },

  initialize() {
    this.searchRepo = new SearchRepository();
  },

  getState() {
    return {
      tracking: this.tracking,
    };
  },

  loadSearchTracking(searchId) {
    this.searchRepo.tracking(searchId).then((data) => {      
      this.tracking = data;
      this.emitChange();
    });
  },

});

module.exports = SearchTrackingStore;