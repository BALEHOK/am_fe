import Actions from './Actions';

export default class SearchComplexFormActions extends Actions {
  loadAssetTypes() {
    this._dispatcher.loadAssetTypes();
  }
}
