import fetch from "../util/fetch";

class TaskRepository {

    loadTasks(assetTypeId) {
        var url = `/api/tasks/assettype/${assetTypeId}`;
        return fetch(url).get();
    }

    executeTask(taskId) {
        var url = `/api/tasks/${taskId}/execute`;
        return fetch(url).post();
    }

}

module.exports = TaskRepository;
