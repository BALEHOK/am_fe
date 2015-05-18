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
        return this._dispatcher
          .loadRelatedAssets(params)
          .then(() => {
            var assets = this._dispatcher.getStore('asset').getState().relatedAssets;
            this._dispatcher.setListValues(assets);
          });
      });
  }

  loadRoles() {
    return this._dispatcher.loadRoles();
  }

  loadList(params) {
    return this._dispatcher.loadList(params);
  }

  updateAssetValue(params) {
    this._dispatcher.updateAssetValue(params);
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

  saveAsset(asset) {
    return this._dispatcher.getStore('asset').saveAsset(asset);
  }

  loadBarcode(params) {
    return this._dispatcher.loadBarcode(params);
  }

  generateBarcode(params) {
    return this._dispatcher.generateBarcode(params);
  }

  deleteAsset(params) {
    this._dispatcher.deleteAsset(params);
  }

  restoreAsset(params) {
    this._dispatcher.restoreAsset(params);
  }

  validateAttribute(params) {
    this._dispatcher.validateAttribute(params);
  }

  loadAssetTypes() {
    return this._dispatcher.loadAssetTypes();
  }
}

module.exports = AssetActions;
