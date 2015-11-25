var Actions = require('./Actions');

class TaskActions extends Actions {

  loadTasks(assetTypeId) {
    return this._dispatcher.loadTasks(assetTypeId);
  }

  loadTasksList() {
    return this._dispatcher.loadTasksList();
  }

  executeTask(taskId) {
    return this._dispatcher.executeTask(taskId);
  }

  clearTaskResponse() {
    return this._dispatcher.clearTaskResponse();
  }

}

module.exports = TaskActions;
