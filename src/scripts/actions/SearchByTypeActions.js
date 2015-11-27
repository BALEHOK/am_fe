import Actions from './Actions';
import SearchModelRepository from '../services/SearchModelRepository';

export default class SearchByTypeActions extends Actions {

  initTypeSearch(searchId) {
    return this._dispatcher.initTypeSearch(searchId);
  }

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

  ensureAttributesLoaded(typeId) {
    return this._dispatcher.ensureAttributesLoaded(typeId);
  }

  loadDataTypeOperators(dataType) {
    return this._dispatcher.loadDataTypeOperators(dataType);
  }

  doSearch(searchModel) {
    searchModel.searchId = SearchModelRepository.generateSearchId();
    SearchModelRepository.saveSerchModel(searchModel);
    this._dispatcher.saveTypeSearchModel(searchModel);

    var appRouter = require('../appRouter');
    appRouter.transitionTo(`/search/type/result?searchId=${searchModel.searchId}`);
  }
}
