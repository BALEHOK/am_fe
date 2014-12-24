var Flux = require('delorean').Flux;
var ListRepository = require('../services/ListRepository');

var ListStore = Flux.createStore({

  list: {
    items: []
  },

  actions: {
    'list:load': 'loadDynamicList'
  },

  initialize() {
    this.listRepo = new ListRepository();
  },

  loadDynamicList(params) {
    this.listRepo.loadDynamicList({
      dynamicListUid: params.dynamicListUid
    }).then((data) => {
      this.list = data;
      this.emitChange();
    });
  },

  getState() {
    return this.list;
  }
});

module.exports = ListStore;