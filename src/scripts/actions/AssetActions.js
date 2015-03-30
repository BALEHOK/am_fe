var Actions = require('./Actions');

class AssetActions extends Actions {

  loadAsset(params) {
    return this._dispatcher.loadAsset(params).then(() => {
      var assetStore = this._dispatcher.getStore('asset').getState();
      var asset = assetStore.asset;      
      this._dispatcher.loadTaxonomyPath(asset.assetTypeId);
      if (asset.barcode)
        this._dispatcher.loadBarcode(asset.barcode);
      return this._dispatcher.loadRelatedAssets(params);
    }).then(() => {
      var assets = this._dispatcher.getStore('asset').getState().relatedAssets;
      this._dispatcher.setListValues(assets);
    });
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
    this._dispatcher.saveAsset(asset);
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
}

module.exports = AssetActions;