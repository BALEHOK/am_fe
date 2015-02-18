var Actions = require('./Actions');

class AssetActions extends Actions {

  loadAsset(params) {
    return this._dispatcher.loadAsset(params).then(() => {
      var assetStore = this._dispatcher.getStore('asset').getState();
      var asset = assetStore.asset;
      return this._dispatcher.loadRelatedAssets(params);
    }).then(() => {
      var assets = this._dispatcher.getStore('asset').getState().relatedAssets;
      this._dispatcher.setListValues(assets);
      this._dispatcher.loadTaxonomyPath(asset.assetTypeId);
    });
    
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

  saveAsset() {}

}

module.exports = AssetActions;