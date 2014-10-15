/// <reference path="../../../typings/backbone/backbone.d.ts" />
import user = require('./User');

export interface ISession {
    authenticated: boolean;
    user: user.UserModel;
}

export class SessionModel extends Backbone.Model implements ISession {

    get authenticated() : boolean {
        return this.get('authenticated');
    }

    set authenticated(value: boolean) {
        this.set('authenticated', value);
    }

    get user(): user.UserModel {
        return this.get('user');
    }

    set user(value: user.UserModel) {
        this.set('user', value);
    }
    
    private supportStorage: boolean;

    constructor() {
        super();
        var that = this;
        this.url = '/api/auth';
    }

    public login(credentials: any) {
        var self = this;
        var login = $.ajax({
            url: this.url + '/login',
            data: credentials,
            type: 'POST'
        });
        login.done(function (response) {
            self.authenticated = true;
            self.user = new user.UserModel(response.user);
            if (self.get('redirectFrom')) {
                var path = self.get('redirectFrom');
                self.unset('redirectFrom');
                Backbone.history.navigate(path, { trigger: true });
            } else {
                Backbone.history.navigate('', { trigger: true });
            }
        });
        login.fail(function () {
            Backbone.history.navigate('login', { trigger: true });
        });
    }

    public getAuth(callback) : JQueryXHR {
        var self = this;
        var request = this.fetch();
        request.done(response => {
            self.authenticated = true;
            self.user = new user.UserModel(response.user);
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