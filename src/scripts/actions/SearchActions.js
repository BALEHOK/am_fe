var Actions = require('./Actions');

module.exports = class SearchActions extends Actions {

  changeSearchFilter(filter) {
    return this._dispatcher.applySearchFilters(filter).then(() => {
      var results = this._dispatcher.getStore('results').getState();
      return this._dispatcher.searchResults(results.filter);
    });
  }

  exportSearchResults(params) {
  	window.location = APIURL + `/v2/export?searchId=${params.searchId}&format=${params.format}`;
  }

}
