var Flux = require('delorean').Flux;
var AssetStore = require('../stores/AssetStore');

var SearchDispatcher = Flux.createDispatcher({

  loadAsset(params) {
    return this.dispatch("asset:load", params);
  },

  getStores() {
    return {
      asset: new AssetStore(),
    }
  }
});

module.exports = SearchDispatcher;