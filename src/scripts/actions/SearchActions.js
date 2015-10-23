var Actions = require('./Actions');

module.exports = class SearchActions extends Actions {

  changeSearchFilter(filter) {
    if (localStorage.as){
      filter.attribs = JSON.parse(localStorage.as);
    }

    return this._dispatcher.applySearchFilters(filter).then(() => {
      var results = this._dispatcher.getStore('results').getState();
      return this._dispatcher.searchResults(results.filter);
    });
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
