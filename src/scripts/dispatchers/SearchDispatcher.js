import {Flux} from 'delorean';
import SearchStore from '../stores/SearchStore';
import ReportStore from '../stores/ReportStore';
import LoginStore from '../stores/LoginStore';
import SearchByTypeStore from '../stores/SearchByTypeStore';

export default Flux.createDispatcher({

  setSearchFilters(filter) {
    return this.dispatch('search:newFilter', filter);
  },

  applySearchFilters(filter) {
    return this.dispatch('search:filter', filter);
  },

  searchResults() {
    return this.dispatch('search:results');
  },

  searchResultsByType() {
    return this.dispatch('search:resultsByType');
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

  resetCustomReports() {
    this.dispatch('reports:reset');
  },

  initTypeSearch(searchId){
    return this.dispatch('searchByType:initTypeSearch', searchId);
  },

  saveTypeSearchModel(model){
    return this.dispatch('search:setTypeSearchModel', model);
  },

  setContext(context) {
    return this.dispatch('searchByType:setContext', context);
  },

  chooseAssetType(assetType) {
    return this.dispatch('searchByType:chooseAssetType', assetType);
  },

  addRow(model) {
    return this.dispatch('searchByType:addRow', model);
  },

  addOpenParenthesis(attributes) {
    return this.dispatch('searchByType:addOpenParenthesis', attributes);
  },

  addClosingParenthesis(attributes) {
    return this.dispatch('searchByType:addClosingParenthesis', attributes);
  },

  deleteRow(model) {
    return this.dispatch('searchByType:deleteRow', model);
  },

  moveRowUp(model) {
    return this.dispatch('searchByType:moveRowUp', model);
  },

  moveRowDown(model) {
    return this.dispatch('searchByType:moveRowDown', model);
  },

  changeRow(model) {
    return this.dispatch('searchByType:changeRow', model);
  },

  ensureAttributesLoaded(typeId) {
    return this.dispatch('searchByType:ensureAttributesLoaded', typeId);
  },

  getStores() {
    return {
      searchByType: new SearchByTypeStore(),
      results: new SearchStore(),
      report: new ReportStore(),
      login: LoginStore
    }
  }
});
