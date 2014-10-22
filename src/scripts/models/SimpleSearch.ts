/// <reference path="../../../typings/backbone/backbone.d.ts" />
import ss = require('../services/SearchService');
import ex = require('../exceptions');
export class SimpleSearch extends Backbone.Model {

    get searchContext(): any {
        return this.get('searchContext');
    }

    set searchContext(value: any) {
        this.set('searchContext', value);
    }

    get query(): string {
        return this.get('query');
    }

    set query(value: string) {
        this.set('query', value);
    }

    private searchService: ss.ISearchService;

    constructor(searchService: ss.ISearchService) {
        super();
        if (searchService == null)
            throw new ex.ArgumentNullException(
                'searchService must be provided');

        this.searchService = searchService;
        this.searchContext = [
            { name: "Active assets", id: 1 },
            { name: "History", id: 2 }
        ];
        var self = this;
        this.on('change:query', (e, value) => {
            self.searchService
                .search(value)
                .done(data => { console.log(data) })
                .fail(error => { console.log(error) });
        });
    }
}