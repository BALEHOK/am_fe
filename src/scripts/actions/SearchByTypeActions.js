import Actions from './Actions';

export default class SearchByTypeActions extends Actions {

  chooseAssetType(assetType) {
    return this._dispatcher.chooseAssetType(assetType);
  }

  setContext(context) {
    return this._dispatcher.setContext(context);
  }

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

  deleteRow(model) {
    return this._dispatcher.deleteRow(model);
  }

  moveRowUp(model) {
    return this._dispatcher.moveRowUp(model);
  }

  moveRowDown(model) {
    return this._dispatcher.moveRowDown(model);
  }

  loadAssetTypes() {
    return this._dispatcher.loadAssetTypes();
  }

  ensureAttributesLoaded(typeId) {
    return this._dispatcher.ensureAttributesLoaded(typeId);
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
