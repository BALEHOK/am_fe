import Actions from './Actions';

export default class SearchComplexFormActions extends Actions {
  fetchAssetTypes() {
    this._dispatcher.loadAssetTypes();
  }
}
