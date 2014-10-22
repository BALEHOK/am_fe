/// <reference path="../../../typings/jquery/jquery.d.ts" />

export interface ISearchService {
    search(query: string): JQueryXHR;
}

export class SearchService implements ISearchService {

    constructor() {

    }

    search(query: string): JQueryXHR {
        return $.ajax({
            url: '/api/search',
            crossDomain: true,
            contentType: 'application/json',
            data: { query: query },
            type: 'GET'
        });
    }
}