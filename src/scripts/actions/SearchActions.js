var Actions = require('./Actions');

module.exports = class SearchActions extends Actions {

  changeSearchFilter(filter) {
    return this._dispatcher.applySearchFilters(filter).then(() => {
      var filters = this._dispatcher.getStore('filters').getState();
      return this._dispatcher.searchResults(filters);
    }).then(() => {
      var searchId = this._dispatcher.getStore('results').searchId;
      var filters = this._dispatcher.getStore('filters').getState();
      return this._dispatcher.getCounters(searchId, filters.query);
    });
  }

}