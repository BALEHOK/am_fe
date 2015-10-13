import Actions from './Actions';

export default class SearchByTypeActions extends Actions {
  loadAssetTypes() {
    this._dispatcher.loadAssetTypes();
  }

  doSearch(searchModel) {
    var appRouter = require('../appRouter');
    appRouter.transitionTo(`/search/result?assetType=${searchModel.typeId}&context=${searchModel.assetTypeContext}`);
  }
}
