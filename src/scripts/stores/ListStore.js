var Flux = require('delorean').Flux;
var ListRepository = require('../services/ListRepository');

var ListStore = Flux.createStore({

  lists: {
    assets: [],
    dynlists: []
  },
  
  actions: {
    'list:dynlists': 'loadDynamicList',
    'list:assets': 'loadAssetsList'
  },

  initialize() {
    this.listRepo = new ListRepository();
  },

  loadDynamicList(params) {
    var uid = params.attributeUid;
    this.listRepo.loadDynamicList({
      assetTypeUid: params.assetTypeUid,
      assetUid: params.assetUid,
      attributeUid: params.attributeUid,
    }).then((data) => {      
      this.lists.dynlists[uid] = data;
      this.emitChange();
    });
  },

  loadAssetsList(params) {
    var assetTypeId = params.assetTypeId;
    this.listRepo.loadAssetsList({
      assetTypeId: params.assetTypeId,
      query: params.query,
      rowStart: params.rowStart,
      rowsNumber: params.rowsNumber
    }).then((data) => {
      this.lists.assets[assetTypeId] = data;
      this.emitChange();
    });
  },

  getState() {
    return this.lists;
  }
});

module.exports = ListStore;