var Flux = require('delorean').Flux;
var ListRepository = require('../services/ListRepository');

var ListStore = Flux.createStore({

  lists: {
    assets: {},
    dynlists: [],
    roles: [],
    zips: {},
    places: {},
    docs: {},
    assettypes: {},
  },

  actions: {
    'list:dynlists': 'loadDynamicList',
    'list:assets': 'loadAssetsList',
    'list:roles': 'loadRoles',
    'list:load': 'loadSimpleList',
    'list:assettypes': 'loadAssetTypes',
    'list:add-asset': 'addAssetItem'
  },

  initialize() {
    this.listRepo = new ListRepository();
  },

  loadSimpleList(params) {
    var req;
    const rowsNumber = 20;
    var val = this.lists[params.name][params.id];

    params.rowsNumber = rowsNumber;
    if(!val || val.filter !== params.filter) {
      params.rowStart = 0;
    } else {
      params.rowStart = val.rowStart + rowsNumber;
    }
    switch(params.name) {
      case 'zips':
        req = this.listRepo.loadZipcodes(params)
        break;
      case 'docs':
        req = this.listRepo.loadDocs(params);
        break;
      case 'places':
        req = this.listRepo.loadPlaces(params)
        break;
    }
    req.then(this.processAutoList.bind(this, params.name, params));
  },

  processAutoList(list, params, data) {
    if(this.lists[list][params.id]) {
        var val = this.lists[list][params.id];
        if(val.filter === params.filter) {
            val.data = _.unique(val.data.concat(data), 'id');
        } else {
            val.data = data;
            val.filter = params.filter;
        }
    } else {
        this.lists[list][params.id] = {
            data,
            filter: params.filter
        };
    }
    this.lists[list][params.id].rowStart = params.rowStart;
    this.emitChange();
  },

  loadRoles() {
    if(this.lists.roles.length === 0) {
      this.listRepo.loadRoles().then(data => {
        this.lists.roles = data;
        this.emitChange();
      });
    }
  },

  loadDynamicList(params) {
    this.listRepo.loadDynamicList(params).then((data) => {
      this.lists.dynlists[params.attributeId] = data;
      this.emitChange();
    });
  },

  addAssetItem({asset, attrId}) {
    if(!this.lists.assets[attrId]) {
      this.lists.assets[attrId] = { items: [] };
    }
    this.lists.assets[attrId].items.push(asset);
  },

  loadAssetsList(params) {
    var assetTypeId = params.assetTypeId;
    if(!this.lists.assets[params.id]) {
      this.lists.assets[params.id] = { items: [] };
    }
    var list = this.lists.assets[params.id];
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

  loadAssetTypes() {
    this.listRepo.loadAssetTypes().then(data => {
      this.lists.assettypes = data;
      this.emitChange();
    });
  },

  getState() {
    return this.lists;
  }
});

module.exports = ListStore;
