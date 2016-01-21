var Flux = require('delorean').Flux;
var SearchRepository = require('../services/SearchRepository');
import {always} from '../util/util';
import SearchModelRepository from '../services/SearchModelRepository';

var SearchResultsStore = Flux.createStore({
  simpleSearchModel: null,
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

  error: false,
  errorMsg: '',

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
      searchByTypeModel: this.searchByTypeModel,
      error: this.error,
      errorMsg: this.errorMsg
    };
  },

  loadResults() {
    if (typeof this.filter.query === 'undefined'
        && this.filter.searchId === this.searchId
        && this.simpleSearchModel !== null) {
      this.simpleSearchModel.searchId = this.searchId;
      this.applySearchFilter(this.simpleSearchModel);
    } else {
      this.simpleSearchModel = this.filter;
    }

    always(this.searchRepo.search(this.filter).then((data) => {
      this.models = data.entities;
      this.searchId = data.searchId;
      this.clearError();
    }).catch(err => {
        if (err.response && err.response.status == 500) {
            this.models = [];
            this.searchId = undefined;
            this.error = true;
            this.errorMsg = err.response.statusText;
        } else {
            throw err;
        }
    }), () => this.emitChange());
  },

  loadResultsByType(){
    if (!this.searchByTypeModel) {
      this.searchModelRepo.getSerchModel(this.filter.searchId)
       .then(d => {
          console.log(d);
          this.searchByTypeModel = d;
          this.loadResultsByType();
        });
      return;
    }

    always(this.searchRepo.searchByType(this.filter, this.searchByTypeModel).then((data) => {
      this.models = data.entities;
      this.searchId = data.searchId;
      this.clearError();
    }).catch(err => {
        if (err.response && err.response.status == 500) {
            this.models = [];
            this.searchId = undefined;
            this.error = true;
            this.errorMsg = err.response.statusText;
        } else {
            throw err;
        }
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

  clearError() {
      this.error = false;
      this.errorMsg = '';
  }

});

module.exports = SearchResultsStore;
