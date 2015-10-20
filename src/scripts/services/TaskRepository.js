import fetch from "../util/fetch";

class TaskRepository {

    loadTasks(assetTypeId) {
        var url = `/api/tasks/assettype/${assetTypeId}`;
        return fetch(url).get();
    }

}

module.exports = TaskRepository;
