/// <reference path="../../../typings/backbone/backbone.d.ts" />
export class Config extends Backbone.Model {

    public get apiUrl() : string {
        return this.get('apiUrl');
    }

    constructor() {
        super();
        this.set('apiUrl', "APIURL");
    }
}