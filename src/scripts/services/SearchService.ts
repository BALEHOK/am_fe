/// <reference path="../../../typings/jquery/jquery.d.ts" />
export class SearchService {

    constructor() {

    }

    // method for test purposes
    getList() : JQueryXHR {
        return $.ajax({
            url: '/api/search',
            crossDomain: true,
            type: 'GET'
        });
    }
}