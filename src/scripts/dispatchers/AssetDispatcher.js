var Flux = require('delorean').Flux;
var AssetStore = require('../stores/AssetStore');
var ListStore = require('../stores/ListStore');
var SearchResultsStore = require('../stores/SearchResultsStore');

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
  
  loadSearchTracking(searchId) {
    return this.dispatch("search:tracking", searchId);
  },

  getStores() {
    return {
      asset: new AssetStore(),
      list: new ListStore(),
      search: new SearchResultsStore()
    }
  }
});

module.exports = AssetDispatcher;