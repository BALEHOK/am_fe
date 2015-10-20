var Flux = require('delorean').Flux;
var TaskRepository = require('../services/TaskRepository');

var TaskStore = Flux.createStore({

    tasks: [],

    actions: {
        'tasks:load': 'loadTasks',
    },

    initialize() {
        this.taskRepo = new TaskRepository();
    },

    loadTasks(assetTypeId) {
        this.taskRepo.loadTasks(assetTypeId).then((data) => {
            this.tasks = data;
            this.emitChange();
        });
    },

    getState() {
        return  {
            tasks: this.tasks,
        }
    }

});

module.exports = TaskStore;
