var Flux = require('delorean').Flux;
var AssetStore = require('../stores/AssetStore');
var ListStore = require('../stores/ListStore');

var AssetDispatcher = Flux.createDispatcher({

  loadAsset(params) {
    return this.dispatch("asset:load", params);
  },

  loadRelatedAssets(params) {
    return this.dispatch("asset:load-related", params);
  },

  loadDynamicList(params) {
  	return this.dispatch("list:dynlists", params);
  },

  loadAssetsList(params) {
  	return this.dispatch("list:assets", params);
  },

  loadTaxonomyPath(assetTypeUid) {
    return this.dispatch("asset:taxonomy-path", params);
  },

  getStores() {
    return {
      asset: new AssetStore(),
      list: new ListStore()
    }
  }
});

module.exports = AssetDispatcher;