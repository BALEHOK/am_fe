var Flux = require('delorean').Flux;
var ListRepository = require('../services/ListRepository');

var ListStore = Flux.createStore({

  lists: [],
  
  actions: {
    'list:load': 'loadDynamicList'
  },

  initialize() {
    this.listRepo = new ListRepository();
  },

  loadDynamicList(params) {
    var uid = params.dynamicListUid;
    this.listRepo.loadDynamicList({
      dynamicListUid: uid
    }).then((data) => {
      this.lists[uid] = data;
      this.emitChange();
    });
  },

  getState() {
    return this.lists;
  }
});

module.exports = ListStore;