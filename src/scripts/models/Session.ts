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
    private bearerToken: string;
    private expirationDate: Date;

    constructor() {
        super();
        this.url = '/api/auth';
    }

    public login(credentials: any,
                 successCallback: JQueryPromiseCallback<any>,
                 errorCallback: JQueryPromiseCallback<any>) {
        var self = this;
        credentials['grant_type'] = 'password';
        var login = $.ajax({
            url: '/token',
            crossDomain: true,
            data: credentials,
            type: 'POST'
        });
        login.done(function (response) {
            self.authenticated = true;
            self.user = new user.UserModel({
                userName: response.UserName,
                lastLogin: response.LastLogin,
                email: response.Email
            });
            self.bearerToken = response.access_token;
            self.expirationDate = new Date(response['.expires']);
            if (self.get('redirectFrom')) {
                var path = self.get('redirectFrom');
                self.unset('redirectFrom');
                Backbone.history.navigate(path, { trigger: true });
            } else {
                Backbone.history.navigate('', { trigger: true });
            }
        });
        login.done(successCallback);
        login.fail(errorCallback);
    }

    public logout() {
        var self = this;
        $.ajax({
            url: this.url + '/logout',
            type: 'DELETE'
        }).done(function (response) {
                //Clear all session data
                self.clear();
                //Set the new csrf token to csrf vaiable and
                //call initialize to update the $.ajaxSetup
                // with new csrf
                //csrf = response.csrf;
                self.initialize();
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