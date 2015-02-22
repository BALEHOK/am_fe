var Flux = require('delorean').Flux;
var ListRepository = require('../services/ListRepository');

var ListStore = Flux.createStore({

  lists: {
    assets: {},
    dynlists: [],
  },

  actions: {
    'list:dynlists': 'loadDynamicList',
    'list:assets': 'loadAssetsList',
    'list:currentVals': 'saveCurrentValues',
    'list:asset-values': 'updateAssetValue'
  },

  initialize() {
    this.listRepo = new ListRepository();
  },

  saveCurrentValues(assets) {
    assets.forEach((el) => {
      this.lists.assets[el.attributeUid] = {
        values: el.assets,
        items: [],
        rowStart: 0,
        rowsNumber: 20
      };
    });
    this.emitChange();
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

  updateAssetValue(params) {
    var list = this.lists.assets[params.uid];
    list.values = _.compact(params.values);
    this.emitChange();
  },

  loadAssetsList(params) {
    var assetTypeId = params.assetTypeId;
    var list = this.lists.assets[params.uid];
    if(list.query != params.query) {
      list.query = params.query;
      list.items = [];
      list.rowStart = 0;
    }
    this.listRepo.loadAssetsList({
      assetTypeId: params.assetTypeId,
      query: list.query,
      rowStart: list.rowStart,
      rowsNumber: list.rowsNumber
    }).then((data) => {
      list.items = _.unique(list.items.concat(data));
      list.rowStart += data.length;
      this.emitChange();
    });
  },

  getState() {
    return this.lists;
  }
});

module.exports = ListStore;