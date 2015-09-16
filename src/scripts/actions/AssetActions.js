var Actions = require('./Actions');

class AssetActions extends Actions {

  loadAsset(params) {
    return this._dispatcher.loadAsset(params)
      .then(() => {

        var asset = this._dispatcher.getStore('asset').getState().asset;
        this._dispatcher.loadTaxonomyPath(asset.assetTypeId);

        if (asset.barcode) {
          this._dispatcher.loadBarcode(asset.barcode);
        }

        return this._dispatcher.loadRelatedAssets(params);
      });
  }

  returnToAsset(attrId, router) {
    let store = this._dispatcher.getStore('asset');
    let nwAsset = store.getState().asset;
    this.popAsset();
    let olAsset = store.getState().asset;
    let transition = (assetTypeId, assetId) => {
        router.transitionTo('asset-edit', {
          assetTypeId: assetTypeId,
          assetId: assetId
        });
    };
    if (attrId) {
        this._dispatcher.addAssetItem({
            asset: nwAsset,
            attrId
        });
        return this.setAttribute(attrId, {id: nwAsset.id, name: nwAsset.name})
          .then(() => transition(olAsset.assetTypeId, olAsset.id));
      } else {
        transition(olAsset.assetTypeId, olAsset.id);
      }
  }

  pushAsset() {
    return this._dispatcher.pushAsset();
  }

  popAsset() {
    return this._dispatcher.popAsset();
  }

  setAttribute(id, value, forceRecalc) {
    return this._dispatcher.setAttribute(id, value, forceRecalc);
  }

  loadRoles() {
    return this._dispatcher.loadRoles();
  }

  loadList(params) {
    return this._dispatcher.loadList(params);
  }

  loadHistory(params) {
    this._dispatcher.loadHistory(params)
  }

  loadAssetsList(params) {
    return this._dispatcher.loadAssetsList(params);
  }

  loadDynamicList(query) {
    return this._dispatcher.loadDynamicList(query);
  }

  loadSearchTracking(searchId) {
    return this._dispatcher.loadSearchTracking(searchId);
  }

  saveAsset() {
    return this._dispatcher.getStore('asset').saveAsset();
  }

  loadBarcode(params) {
    return this._dispatcher.loadBarcode(params);
  }

  generateBarcode(params) {
    return this._dispatcher.generateBarcode(params);
  }

  deleteAsset(params) {
    return this._dispatcher.deleteAsset(params);
  }

  restoreAsset(params) {
    return this._dispatcher.restoreAsset(params);
  }

  validateAttribute(params) {
    this._dispatcher.validateAttribute(params);
  }

  clearAttributeValidation(params) {
    this._dispatcher.clearAttributeValidation(params);
  }

  loadAssetTypes() {
    return this._dispatcher.loadAssetTypes();
  }

  loadReports(assetTypeId) {
    return this._dispatcher.loadReports(assetTypeId);
  }

  setValidationResult(result) {
    this._dispatcher.setValidationResult(result);
  }

  recalculate() {
    return this._dispatcher.recalculate();
  }

  changeScreen(screenIndex) {
    return this._dispatcher.changeScreen(screenIndex);
  }
}

module.exports = AssetActions;
