/// <reference path="../../../typings/backbone/backbone.d.ts" />

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

    constructor() {
        super();
        this.searchContext = [
            { name: "Active assets", id: 1 },
            { name: "History", id: 2 }
        ];
    }
}