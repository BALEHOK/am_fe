var Actions = require('./Actions');

class SearchMainActions extends Actions {

  changeSearchFilter(filter) {
    var appRouter = require('../appRouter');
    appRouter.transitionTo(`/search/result?query=%20${filter.query}&context=${filter.context}`);
  }
}

module.exports = SearchMainActions;