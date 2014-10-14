/// <reference path="../../../typings/backbone/backbone.d.ts" />
export class SessionModel extends Backbone.Model {

    private supportStorage: boolean;

    constructor() {
        super();
        this.url = '/api/auth';
    }

    public getAuth(callback) {
        var self = this;
        var Session = this.fetch();
        Session.done(response => {
            this.set('authenticated', true);
            this.set('user', JSON.stringify(response.user));
        });
        Session.fail(response => {
            //response = JSON.parse(response.responseText);
            //self.clear();
            //csrf = response.csrf !== csrf ? response.csrf : csrf;
            //self.initialize();
        });
        Session.always(callback);
    }
}