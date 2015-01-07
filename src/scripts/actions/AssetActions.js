var Actions = require('./Actions');

class AssetActions extends Actions {

  loadAsset(params) {
    this._dispatcher.loadAsset(params);
  }

  loadRelatedAssets(params) {
    this._dispatcher.loadRelatedAssets(params);
  }

  loadAssetsList(params) {
  	this._dispatcher.loadAssetsList(params);	
  }

  loadDynamicList(query) {
  	this._dispatcher.loadDynamicList(query);
  }

  saveAsset() {}

}

module.exports = AssetActions;