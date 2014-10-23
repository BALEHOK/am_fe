/// <reference path="../../../typings/jquery/jquery.d.ts" />
import events = require('../util/LiteEvent');

export interface IAuthService {
    LoggedIn: events.ILiteEvent<any>;
    login(credentials: any): JQueryXHR;
    getAuthStatus(): JQueryDeferred<boolean>;
}

export class AuthService implements IAuthService {

    public get LoggedIn(): events.ILiteEvent<any> {
        return this.onLogin;
    }

    private onLogin = new events.LiteEvent<any>();

    constructor() {
        $.ajaxPrefilter((options, originalOptions, jqXHR) => {
            var bearerToken = localStorage.getItem('bearerToken');
            if (bearerToken)
                return jqXHR.setRequestHeader(
                    'Authorization',
                    'Bearer ' + bearerToken);
        });
    }

    public login(credentials: any): JQueryXHR {
        credentials['grant_type'] = 'password';
        var self = this;
        var login = $.ajax({
            url: '/token',
            data: credentials,
            crossDomain: true,
            type: 'POST'
        });
        login.done((response) => {
            self.onLogin.trigger(response);
        });
        return login;
    }

    //public logout() {
    //    var self = this;
    //    $.ajax({
    //        url: this.url + '/logout',
    //        type: 'DELETE'
    //    }).done(function (response) {
    //        //Clear all session data
    //        self.clear();
    //        //Set the new csrf token to csrf vaiable and
    //        //call initialize to update the $.ajaxSetup
    //        // with new csrf
    //        //csrf = response.csrf;
    //        self.initialize();
    //        Backbone.history.navigate('login', { trigger: true });
    //    });
    //}

    public getAuthStatus() : JQueryDeferred<boolean> {
        var dfd = $.Deferred<boolean>();
        $.ajax({
            url: '/api/auth',
            type: 'GET',
            crossDomain: true,
        })
        .done(() => {
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