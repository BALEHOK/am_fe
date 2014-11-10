/// <reference path="../../../typings/jquery/jquery.d.ts" />

export interface ISearchService {
    search(query: string, page: number, assetType: number, taxonomy: number, sortBy: number): JQueryXHR;
    counters(searchId: number, query: string): JQueryXHR;
}

export class SearchService implements ISearchService {
    search(query: string, page: number, assetType: number, taxonomy: number, sortBy: number): JQueryXHR {
        return $.ajax({
            url: '/api/search',
            crossDomain: true,
            contentType: 'application/json',
            data: { 
                query: query, 
                page: page, 
                assetType: assetType, 
                taxonomy: taxonomy,
                sortBy: sortBy 
            },
            type: 'GET'
        });
    }

    counters(searchId: number, query: string): JQueryXHR {
        return $.ajax({
            url: '/api/search/counters',
            crossDomain: true,
            contentType: 'application/json',
            data: { searchId: searchId, query: query },
            type: 'GET'
        });
    }
}