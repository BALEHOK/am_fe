/// <reference path="../../../typings/backbone/backbone.d.ts" />
export class SimpleSearch extends Backbone.Model {

    get searchContext(): any {
        if (this.get('searchContext') == null)
            this.set('searchContext', this.loadContexts());
        return this.get('searchContext');
    }

    set searchContext(value: any) {
        this.set('searchContext', value);
    }

    constructor() {
        super();
    }

    loadContexts() {
        return [
            { name: "Active assets", id: 1 },
            { name: "History", id: 2 }
        ];
    }
}