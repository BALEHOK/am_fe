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
    'search:counters': 'loadSearchCounters',
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

  loadResults(filters) {
    var attribs = this.lastSearch
      ? this.lastSearch.attributes
      : null;

    always(this.searchRepo.search(filters, attribs).then((data) => {
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
