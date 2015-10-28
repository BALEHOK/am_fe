import fetch from "../util/fetch";
import {param} from '../util/util';

export default class TaskRepository {

    loadTasks(assetTypeId) {
        var url = `/api/tasks/assettype/${assetTypeId}`;
        return fetch(url).get();
    }

    executeTask(taskId) {
        var url = `/api/tasks/${taskId}/execute`;
        return fetch(url).post();
    }

    redirectOnComlete(taskFunctionType, params) {
        var appRouter = require('../appRouter');
        var redirectUrl;
        switch(taskFunctionType) {
            case 'EXECUTESEARCH':
                redirectUrl = `/search/result?` + param(params);
                break;
            case 'CREATEASSET':
                redirectUrl = `/assettype/${params.assetTypeId}/asset`;
                break;
            default:
                console.log(params);
        }
        redirectUrl ? appRouter.transitionTo(redirectUrl) : false;
    }

}
