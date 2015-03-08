var Flux = require('delorean').Flux;
var AssetRepository = require('../services/AssetRepository');

var AssetStore = Flux.createStore({

  asset: {
    name: undefined,
    revision: undefined,
    updatedAt: undefined,
    screens: [],    
  }, 

  relatedAssets: [],

  taxonomyPath: undefined,

  actions: {
    'asset:load': 'loadAsset',
    'asset:load-related': 'loadRelatedAssets',
    'asset:taxonomy-path': 'loadTaxonomyPath',
    'asset:delete': 'deleteAssset',
    'asset:restore': 'restoreAsset',
  },

  initialize() {
    this.assetRepo = new AssetRepository();
  },

  loadAsset(params) {
    this.assetRepo.loadAsset(params).then((data) => {
      this.asset = data;
      this.emitChange();
    });
  },

  loadRelatedAssets(params) {
    this.assetRepo.loadRelatedAssets({
      assetTypeId: params.assetTypeId,
      assetId: params.assetId
    }).then((data) => {  
      this.relatedAssets = data;
      this.emitChange();
    });
  },

  loadTaxonomyPath(assetTypeId) {
    this.assetRepo.loadTaxonomyPath(assetTypeId).then((data) => {  
      this.taxonomyPath = data;
      this.emitChange();
    });
  },

  deleteAsset(params) {
    this.assetRepo.deleteAsset(params).then(() => {
      this.asset.isHistory = true;
      this.emitChange();
    });
  },

  restoreAsset(params) {
    this.assetRepo.restoreAsset(params).then(() => {
      this.asset.isHistory = false;
      this.emitChange();
    });
  },

  getState() {
    return  { 
      asset: this.asset,
      relatedAssets: this.relatedAssets,
      taxonomyPath: this.taxonomyPath,
    };
  }
});

module.exports = AssetStore;