var Actions = require('./Actions');

class AssetActions extends Actions {

  loadAsset(params) {
    this._dispatcher.loadAsset(params);
  }

  saveAsset() {}

}

module.exports = AssetActions;