var Actions = require('./Actions');

module.exports = class SearchActions extends Actions {

  setSearchFilter(filter) {
    return this._dispatcher
      .setSearchFilters(filter)
      .then(() => this.searchResults());
  }

  changeSearchFilter(filter) {
    return this._dispatcher
      .applySearchFilters(filter)
      .then(() => this.searchResults());
  }

  searchResults() {
    var results = this._dispatcher.getStore('results').getState();
    return this._dispatcher.searchResults(results.filter);
  }

  fetchSearchCounters(results) {
    var results = this._dispatcher.getStore('results').getState();
    return this._dispatcher.getCounters(results.searchId,
      results.filter.query,
      results.filter.context);
  }

  exportSearchResults(params) {
  	window.location = APIURL + `/export?searchId=${params.searchId}&format=${params.format}`;
  }

  fetchCustomReportsByType(assetTypeId) {
    return this._dispatcher.loadReports(assetTypeId);
  }

  resetCustomReports() {
    this._dispatcher.resetCustomReports();
  }

}
