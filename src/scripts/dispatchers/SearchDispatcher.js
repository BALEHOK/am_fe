import {Flux} from 'delorean';
import SearchStore from '../stores/SearchStore';
import ReportStore from '../stores/ReportStore';
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

  saveTypeSearchModel(model){
    return this.dispatch('search:saveTypeSearch', model);
  },

  loadAssetTypes() {
    return this.dispatch('searchByType:assetTypes');
  },
  
  loadAssetAttributes(typeId) {
    return this.dispatch('searchByType:assetAttributes', typeId);
  },
  
  loadDataTypeOperators(dataType) {
    return this.dispatch('searchByType:dataTypeOperators', dataType);
  },

  getStores() {
    return {
      searchByType: new SearchByTypeStore(),
      results: new SearchStore(),
      report: new ReportStore()
    }
  }
});
