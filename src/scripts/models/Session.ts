/// <reference path="../../../typings/backbone/backbone.d.ts" />
export class SessionModel extends Backbone.Model {

    private supportStorage: boolean;

    constructor() {
        super();
        var that = this;
        this.url = '/api/auth';
        //$.ajaxPrefilter((options, originalOptions, jqXHR) => {
        //    options.xhrFields = {
        //        withCredentials: true
        //    };
        //    options.crossDomain = true;
        //    options.headers = options.headers || {};
        //    // If we have a csrf token send it through with the next request
        //    if (typeof that.get('_csrf') !== 'undefined') {
        //        jqXHR.setRequestHeader('X-CSRF-Token', that.get('_csrf'));
        //    }
        //});
    }

    public getAuth(callback) : JQueryXHR {
        var self = this;
        var request = this.fetch();
        request.done(response => {
            this.set('authenticated', true);
            this.set('user', JSON.stringify(response.user));
        });
        request.fail(response => {
            //console.log(response.status === 401);
            //response = JSON.parse(response.responseText);
            self.clear();
            //csrf = response.csrf !== csrf ? response.csrf : csrf;
            //self.initialize();
        });
        request.always(callback);
        return request;
    }
}