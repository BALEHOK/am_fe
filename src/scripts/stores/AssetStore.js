var Flux = require('delorean').Flux;
var AssetRepository = require('../services/AssetRepository');

var AssetStore = Flux.createStore({

  asset: {
    name: undefined,
    revision: undefined,
    updatedAt: undefined,
    screens: [],  
    barcode: undefined,  
  }, 

  relatedAssets: [],

  taxonomyPath: undefined,

  actions: {
    'asset:load': 'loadAsset',
    'asset:load-related': 'loadRelatedAssets',
    'asset:taxonomy-path': 'loadTaxonomyPath',
    'asset:delete': 'deleteAsset',
    'asset:restore': 'restoreAsset',
    'asset:barcode': 'loadBarcode',
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
    this.assetRepo.loadRelatedAssets(params).then((data) => {  
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
      this.asset.isDeleted = true;
      this.emitChange();
    });
  },

  restoreAsset(params) {
    this.assetRepo.restoreAsset(params).then(() => {
      this.asset.isDeleted = false;
      this.emitChange();
    });
  },

  loadBarcode(barcode) {
    this.assetRepo.loadBarcode(barcode).then((data) => {
      this.asset.barcode = data;
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