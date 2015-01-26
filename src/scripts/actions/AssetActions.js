var Actions = require('./Actions');

class AssetActions extends Actions {

  loadAsset(params) {
    this._dispatcher.loadAsset(params).then(() => {
      this._dispatcher.loadRelatedAssets(params);  
    });
    
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