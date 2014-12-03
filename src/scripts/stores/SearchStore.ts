/// <reference path="../../../typings/backbone/backbone.d.ts" />
/// <reference path="../../../typings/AppDispatcher.d.ts" />
import events = require('../util/LiteEvent');

export class SearchStore extends Backbone.Collection<any> {
  
    public currentSearchId: number;
    
    public dispatchToken: any;

    public get OnSearchDone(): events.ILiteEvent<number> {
        return this.onSearchDone;
    }
    private onSearchDone = new events.LiteEvent<number>();

    private static instance: SearchStore;
    public static getInstance() : SearchStore {
        if (SearchStore.instance == null) {
            SearchStore.instance = new SearchStore();
        }
        return SearchStore.instance;
    }

    private constructor() {
        super();
        if(SearchStore.instance) {
            throw new Error("Error: Instantiation failed: Use SearchStore.getInstance() instead of new.");
        }
        var boundFunction = (this.dispatchCallback).bind(this);
        this.dispatchToken = AppDispatcher.register(boundFunction);    
    }

    dispatchCallback(payload: any){
        if (payload.action == 'search') {
            this.search(payload.data);
        }        
    }

    search(params: any) {
        var self = this;
        $.ajax({
            url: '/api/search',
            contentType: 'application/json',
            data: { 
                query: params.query, 
                page: params.page, 
                assetType: params.assetType, 
                taxonomy: params.taxonomy,
                sortBy: params.sortBy 
            },
            type: 'GET'
        })
        .done(function(data) {
            self.currentSearchId = data.searchId;
            self.onSearchDone.trigger(data.searchId);
            self.set(data.entities);  
        })
        .fail(function(data) {
            // TODO
            console.log('TODO: handle error', data);
        });
    }
}