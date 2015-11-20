var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');
import {always} from '../util/util';
import SearchModelRepository from '../services/SearchModelRepository';

var SearchResultsStore = Flux.createStore({
  searchByTypeModel: null,
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
    'search:setTypeSearchModel': 'setTypeSearchModel'
  },

  initialize() {
    this.searchRepo = new SearchRepository();
    this.searchModelRepo = SearchModelRepository;
  },

  getState() {
    return {
      models: this.models,
      searchId: this.searchId,
      counters: this.counters,
      filter: this.filter,
      searchByTypeModel: this.searchByTypeModel
    };
  },

  loadResults() {
    always(this.searchRepo.search(this.filter).then((data) => {
      this.models = data.entities;
      this.searchId = data.searchId;
    }), () => this.emitChange());
  },

  loadResultsByType(){
    if (!this.searchByTypeModel) {
      this.getSearchByTypeModelModel()
        .then(() => this.loadResultsByType())
      return;
    }

    var attribs = this.searchByTypeModel
      ? this.searchByTypeModel.attributes
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

  setTypeSearchModel(model) {
    this.searchByTypeModel = model;
  },

  getSearchByTypeModelModel() {
    return this.searchModelRepo.getSerchModel(this.filter.searchId)
      then(d => this.searchByTypeModel = d);
  }
});

module.exports = SearchResultsStore;
