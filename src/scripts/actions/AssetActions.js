var Actions = require('./Actions');

class AssetActions extends Actions {

  loadAsset(params) {
    this._dispatcher.loadAsset(params);
  }

  saveAsset() {}

  loadDynamicList(query) {
  	this._dispatcher.loadDynamicList(query);
  }

}

module.exports = AssetActions;