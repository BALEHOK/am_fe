/// <reference path="../../../typings/jquery/jquery.d.ts" />

export interface ISearchService {
    search(query: string, page: number): JQueryXHR;
}

export class SearchService implements ISearchService {
    search(query: string, page: number): JQueryXHR {
        return $.ajax({
            url: '/api/search',
            crossDomain: true,
            contentType: 'application/json',
            data: { query: query, page: page },
            type: 'GET'
        });
    }
}