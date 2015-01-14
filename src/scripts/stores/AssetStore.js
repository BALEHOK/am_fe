var Flux = require('delorean').Flux;
var AssetRepository = require('../services/AssetRepository');

var AssetStore = Flux.createStore({

  asset: {
    screens: [],
    relatedAssets: []
  }, 

  actions: {
    'asset:load': 'loadAsset',
    'asset:load-related': 'loadRelatedAssets'
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

  loadRelatedAssets(params) {
    this.assetRepo.loadRelatedAssets({
      assetTypeUid: params.assetTypeUid,
      assetUid: params.assetUid,
      attributeUid: params.attributeUid,
    }).then((data) => {
      if (!this.asset.relatedAssets)
        this.asset.relatedAssets = [];
      this.asset.relatedAssets[params.attributeUid] = data;
      this.emitChange();
    });
  },

  getState() {
    return this.asset;
  }
});

module.exports = AssetStore;