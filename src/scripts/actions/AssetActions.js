var Actions = require('./Actions');

class AssetActions extends Actions {

  loadAsset(params) {
    this._dispatcher.loadAsset(params).then(() => {
      var assetStore = this._dispatcher.getStore('asset').getState();
      var asset = assetStore.asset;
      this._dispatcher.loadTaxonomyPath(asset.assetTypeId);
      this._dispatcher.loadRelatedAssets(params);  
    });
    
  }

  loadAssetLists(params) {
  	this._dispatcher.loadAssetLists(params);	
  }
  
  loadSearchTracking(searchId) {
    this._dispatcher.loadSearchTracking(searchId);
  }

  saveAsset() {}

}

module.exports = AssetActions;