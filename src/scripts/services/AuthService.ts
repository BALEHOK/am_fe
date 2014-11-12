/// <reference path="../../../typings/jquery/jquery.d.ts" />
import events = require('../util/LiteEvent');

export interface IAuthService {
    OnAuthInfo: events.ILiteEvent<any>;
    getAuthStatus(): JQueryDeferred<boolean>;
    login(credentials: any): JQueryXHR;    
}

export class AuthService implements IAuthService {

    public get OnAuthInfo(): events.ILiteEvent<any> {
        return this.onAuth;
    }

    private onAuth = new events.LiteEvent<any>();

    public login(credentials: any): JQueryXHR {
        credentials['grant_type'] = 'password';
        var self = this;
        var login = $.ajax({
            url: '/token',
            type: 'POST',
            data: credentials,
        });
        login.done((response) => {
            self.onAuth.trigger(response);
        });
        return login;
    }

    public getAuthStatus() : JQueryDeferred<boolean> {
        var dfd = $.Deferred<boolean>();
        var self = this;
        $.ajax({
            url: '/api/auth',
            type: 'GET',
        })
        .done((response) => { 
            self.onAuth.trigger(response);           
            dfd.resolve(true);
        })
        .fail(response => {
            if (response.status === 401) {
                dfd.resolve(false);
            } else {
                dfd.reject();
            }
        });
        return dfd;
    }
}