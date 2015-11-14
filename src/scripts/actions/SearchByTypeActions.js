import Actions from './Actions';

export default class SearchByTypeActions extends Actions {

  addRow(model) {
    return this._dispatcher.addRow(model);
  }

  addOpenParenthesis(attributes) {
    return this._dispatcher.addOpenParenthesis(attributes);
  }
  
  addClosingParenthesis(attributes) {
    return this._dispatcher.addClosingParenthesis(attributes);
  }

  changeRow(model) {
    return this._dispatcher.changeRow(model);
  }

  setSearchModel(modelDiff) {
    return this._dispatcher.setSearchModel(modelDiff);
  }

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
    appRouter.transitionTo(`/search/type/result?assetType=${searchModel.assetType.id}&context=${searchModel.assetTypeContext}`);
  }
}
