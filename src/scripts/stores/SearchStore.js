var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');
import {always} from "../util/util";

var SearchResultsStore = Flux.createStore({
  lastSearch: null,
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
    'search:resultsByType': 'loadResultsByType',
    'search:counters': 'loadSearchCounters',
    'search:newFilter': 'setSearchFilter',
    'search:filter': 'applySearchFilter',
    'search:saveTypeSearch': 'saveTypeSearch'
  },

  initialize() {
    this.searchRepo = new SearchRepository();
    this.lastSearch = this.getLastSearchModel();
  },

  getState() {
    return {
      models: this.models,
      searchId: this.searchId,
      counters: this.counters,
      filter: this.filter,
      lastSearch: this.lastSearch
    };
  },

  loadResults() {
    always(this.searchRepo.search(this.filter).then((data) => {
      this.models = data.entities;
      this.searchId = data.searchId;
    }), () => this.emitChange());
  },

  loadResultsByType(){
    var attribs = this.lastSearch
      ? this.lastSearch.attributes
      : null;

    always(this.searchRepo.searchByType(this.filter, attribs).then((data) => {
      this.models = data.entities;
      this.searchId = data.searchId;
    }), () => this.emitChange());
  },

  loadSearchCounters(search) {
    always(this.searchRepo.counters(search).then((data) => {
      this.counters = data;
    }), () => this.emitChange());
  },

  // overrides search filter (used for new search)
  setSearchFilter(filter) {
    this.filter = _.extend({}, filter);
    this.emitChange();
  },

  // extends search filter
  applySearchFilter(filter) {
    this.filter = _.extend({}, this.filter, filter);
    this.emitChange();
  },

  saveTypeSearch(model) {
    this.lastSearch = model;
    localStorage.lastSearch = JSON.stringify(model);
  },

  getLastSearchModel() {
    var json = localStorage.lastSearch;
    if (json){
      return JSON.parse(json);
    }

    return null;
  }
});

module.exports = SearchResultsStore;
