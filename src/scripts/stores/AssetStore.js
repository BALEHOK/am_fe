var Flux = require('delorean').Flux;
var AssetRepository = require('../services/AssetRepository');

var AssetStore = Flux.createStore({

  asset: {
    screens: []
  },

  actions: {
    'asset:load': 'loadAsset'
  },

  initialize() {
    this.assetRepo = new AssetRepository();
  },

  loadAsset(params) {
    this.assetRepo.loadAsset({
      assetTypeUid: params.assetTypeUid,
      assetUid: params.assetUid
    }).then((data) => {
      this.asset = data;
      this.emitChange();
    });
  },

  getState() {
    return this.asset;
  }
});

module.exports = AssetStore;