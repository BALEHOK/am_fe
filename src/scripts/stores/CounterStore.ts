/// <reference path="../../../typings/backbone/backbone.d.ts" />
/// <reference path="../../../typings/AppDispatcher.d.ts" />

export class SearchCounterStore extends Backbone.Model {
  
    public get totalCount(): number {
        return this.get('totalCount');
    };

    public get assetTypes(): any {
        return this.get('assetTypes');
    };

    public get taxonomies(): any {
        return this.get('taxonomies');
    };

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
        this.set('assetTypes', []);
        this.set('taxonomies', []);
        var boundFunction = (this.dispatchCallback).bind(this);
        this.dispatchToken = AppDispatcher.register(boundFunction);        
    }

    dispatchCallback(payload: any){
        if (payload.action == 'search-counters') {
            this.getCounters(payload.data.searchId, payload.data.query);
        }        
    }

    getCounters(searchId: number, query: string) {
        var self = this;
        $.ajax({
            url: '/api/search/counters',
            contentType: 'application/json',
            data: { searchId: searchId, query: query },
            type: 'GET'
        })
        .done(function(data) {
            self.set('totalCount', data.totalCount);    
            self.set('assetTypes', data.assetTypes);    
            self.set('taxonomies', data.taxonomies);  
        })
        .fail(function(data) {
            // TODO
            console.log('TODO: handle error', data);
        });
    }
}