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

  loadHistory(params) {
    this._dispatcher.loadHistory(params)
  }

  loadAssetsList(params) {
  	this._dispatcher.loadAssetsList(params);
  }

  loadDynamicList(query) {
  	this._dispatcher.loadDynamicList(query);
  }

  loadSearchTracking(searchId) {
    this._dispatcher.loadSearchTracking(searchId);
  }

  saveAsset() {}

}

module.exports = AssetActions;