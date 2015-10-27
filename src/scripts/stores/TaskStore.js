var Flux = require('delorean').Flux;
var TaskRepository = require('../services/TaskRepository');

var TaskStore = Flux.createStore({

    tasks: [],

    response: {
        status: null,
        result: null,
        errors: [],
        shouldRedirectOnComplete: false,
        taskFunctionType: null
    },

    actions: {
        'tasks:load': 'loadTasks',
        'tasks:exec': 'executeTask',
        'tasks:clearResponse': 'clearResponse',
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

    executeTask(taskId) {
        this.taskRepo.executeTask(taskId).then((data) => {
            this.response = {
                status: data.status,
                result: data.result,
                errors: data.errors,
                shouldRedirectOnComplete: data.shouldRedirectOnComplete,
                taskFunctionType: data.taskFunctionType
            };
            this.emitChange();
        });
    },

    clearResponse() {
        this.response = {
            status: null,
            result: null,
            errors: [],
            shouldRedirectOnComplete: false,
            taskFunctionType: null
        };
        this.emitChange();
    },

    getState() {
        return  {
            tasks: this.tasks,
            response: this.response
        }
    }

});

module.exports = TaskStore;
