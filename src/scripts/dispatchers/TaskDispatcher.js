var Flux = require('delorean').Flux;
var TaskStore = require('../stores/TaskStore');

var AssetDispatcher = Flux.createDispatcher({

  loadTasksList() {
    return this.dispatch('tasks:loadList');
  },

  executeTask(taskId) {
    return this.dispatch('tasks:exec', taskId);
  },

  clearTaskResponse() {
      return this.dispatch('tasks:clearResponse');
  },

  getStores() {
    return {
      tasks: new TaskStore(),
    }
  }
});

module.exports = AssetDispatcher;
