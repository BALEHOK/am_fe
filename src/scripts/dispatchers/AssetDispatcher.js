var Flux = require('delorean').Flux;
var AssetStore = require('../stores/AssetStore');
var ListStore = require('../stores/ListStore');

var SearchDispatcher = Flux.createDispatcher({

  loadAsset(params) {
    return this.dispatch("asset:load", params);
  },

  loadDynamicList(params) {
  	return this.dispatch("list:load", params);
  },

  getStores() {
    return {
      asset: new AssetStore(),
      list: new ListStore()
    }
  }
});

module.exports = SearchDispatcher;