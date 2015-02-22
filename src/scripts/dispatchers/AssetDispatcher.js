var Flux = require('delorean').Flux;
var AssetStore = require('../stores/AssetStore');
var ListStore = require('../stores/ListStore');
var SearchTrackingStore = require('../stores/SearchTrackingStore');
var HistoryStore = require('../stores/HistoryStore');

var AssetDispatcher = Flux.createDispatcher({

  loadAsset(params) {
    return this.dispatch("asset:load", params);
  },

  loadRelatedAssets(params) {
    return this.dispatch("asset:load-related", params);
  },

  loadHistory(params) {
    return this.dispatch("history:load", params);
  },

  loadDynamicList(params) {
  	return this.dispatch("list:dynlists", params);
  },

  loadAssetsList(params) {
  	return this.dispatch("list:assets", params);
  },

  loadTaxonomyPath(assetTypeId) {
    return this.dispatch("asset:taxonomy-path", assetTypeId);
  },

  loadSearchTracking(searchId) {
    return this.dispatch("search:tracking", searchId);
  },

  getStores() {
    return {
      asset: new AssetStore(),
      list: new ListStore(),
      search: new SearchTrackingStore(),
      history: new HistoryStore()
    }
  }
});

module.exports = AssetDispatcher;