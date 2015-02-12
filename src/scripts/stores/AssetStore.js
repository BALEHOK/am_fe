var Flux = require('delorean').Flux;
var AssetRepository = require('../services/AssetRepository');

var AssetStore = Flux.createStore({

  asset: {
    screens: [],    
  }, 

  relatedAssets: [],

  taxonomyPath: undefined,

  lists: {
    assets: [],
    dynlists: []
  },

  actions: {
    'asset:load': 'loadAsset',
    'asset:load-related': 'loadRelatedAssets',
    'asset:taxonomy-path': 'loadTaxonomyPath',
    'asset:load-lists': 'loadAssetLists'
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
      assetUid: params.assetUid
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

  loadAssetLists(params) {

  },

  getState() {
    return  { 
      asset: this.asset,
      relatedAssets: this.relatedAssets,
      taxonomyPath: this.taxonomyPath,
      lists: this.lists
    };
  }
});

module.exports = AssetStore;