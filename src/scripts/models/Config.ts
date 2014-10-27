
export class Config extends Backbone.Model {
	
    public get apiUrl() : string {
        return this.get('apiUrl');
    }
	
    constructor() {
        super();
        //this.set('apiUrl', 'http://facilitymanager.facilityflexware.com');
        this.set('apiUrl', 'http://am.local');
    }
}