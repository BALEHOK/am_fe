/// <reference path="../../../typings/backbone/backbone.d.ts" />

export class SearchResult extends Backbone.Model {

    get SortByItems(): any {
        return this.get('SortByItems');
    }

    set SortByItems(value: any) {
        this.set('SortByItems', value);
    }
   
    constructor() {
        super();
        this.SortByItems = [
            { name: "Rank", id: 0 },
            { name: "Date", id: 1 },
            { name: "Location", id: 2 },
            { name: "User", id: 3 },
        ];
    }
}