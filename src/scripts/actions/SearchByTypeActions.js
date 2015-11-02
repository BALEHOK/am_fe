import Actions from './Actions';

export default class SearchByTypeActions extends Actions {
  loadAssetTypes() {
    return this._dispatcher.loadAssetTypes();
  }

  loadAssetAttributes(typeId) {
    return this._dispatcher.loadAssetAttributes(typeId);
  }

  loadDataTypeOperators(dataType) {
    return this._dispatcher.loadDataTypeOperators(dataType);
  }

  doSearch(searchModel) {
    this._dispatcher.saveTypeSearchModel(searchModel);

    var appRouter = require('../appRouter');
    appRouter.transitionTo(`/search/result?assetType=${searchModel.assetType.id}&context=${searchModel.assetTypeContext}`);
  }
}
