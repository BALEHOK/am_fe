/// <reference path="../../../typings/backbone/backbone.d.ts" />
/// <reference path="../../../typings/AppDispatcher.d.ts" />
import SearchStoreModule = require('./SearchStore');
var SearchStore = SearchStoreModule.SearchStore.getInstance();

export class SearchCounter extends Backbone.Model {
}

export class SearchCounterStore extends Backbone.Collection<SearchCounter> {
  
    public currentSearchId: number;

    public dispatchToken: any;

    private static instance: SearchCounterStore;
    public static getInstance() : SearchCounterStore {
        if (SearchCounterStore.instance == null) {
            SearchCounterStore.instance = new SearchCounterStore();
        }
        return SearchCounterStore.instance;
    }

    private constructor() {
        super();
        if(SearchCounterStore.instance) {
            throw new Error("Error: Instantiation failed: Use SearchCounterStore.getInstance() instead of new.");
        }
        var boundFunction = (this.dispatchCallback).bind(this);
        this.dispatchToken = AppDispatcher.register(boundFunction);        
    }

    dispatchCallback(payload: any){
        if (payload.action == 'search') {
            console.log('search-c-1');            
            AppDispatcher.waitFor([SearchStore.dispatchToken]);
            console.log('search-c-2');
            this.counters(SearchStore.currentSearchId, payload.data.query);
        }        
    }

    counters(searchId: number, query: string) {
        var self = this;
        $.ajax({
            url: '/api/search/counters',
            crossDomain: true,
            contentType: 'application/json',
            data: { searchId: searchId, query: query },
            type: 'GET'
        })
        .done(function(data) {
            self.currentSearchId = data.searchId;
            self.set(data.entities);    
        })
        .fail(function(data) {
            // TODO
            console.log('TODO: handle error', data);
        });
    }
}