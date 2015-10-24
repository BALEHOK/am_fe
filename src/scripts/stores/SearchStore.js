var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');
import {always} from "../util/util";

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
    context: 1,
    attribs: null
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
    always(this.searchRepo.search(filters).then((data) => {
      this.models = data.entities;
      this.searchId = data.searchId;
    }), () => this.emitChange());
  },

  loadSearchCounters(search) {
    always(this.searchRepo.counters(search).then((data) => {
      this.counters = data;
    }), () => this.emitChange());
  },

  applySearchFilter(filter) {
    this.filter = _.extend({}, this.filter, filter);
    this.emitChange();
  }

});

module.exports = SearchResultsStore;
