import Actions from './Actions';

export default class SearchByTypeActions extends Actions {
  loadAssetTypes() {
    return this._dispatcher.loadAssetTypes();
  }

  doSearch(searchModel) {
    var appRouter = require('../appRouter');
    appRouter.transitionTo(`/search/result?assetType=${searchModel.typeId}&context=${searchModel.assetTypeContext}`);
  }
}
