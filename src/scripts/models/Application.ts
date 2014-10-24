/// <reference path="../../../typings/backbone/backbone.d.ts" />
import session = require('./Session');
import user = require('./User');
import authServiceModule = require('../services/AuthService');
import exceptionsModule = require('../exceptions');

export class Application extends Backbone.Model {

    public get Session() {
        return this.session;
    }

    private session: session.SessionModel = new session.SessionModel();
    private authService: authServiceModule.IAuthService;

    constructor(authService: authServiceModule.IAuthService) {
        super();
        if (authService == null)
            throw new exceptionsModule.ArgumentNullException();

        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            // TODO: inject via config
            var apiUrl = 'http://facilitymanager.facilityflexware.com';
            //var apiUrl = 'http://am.local';
            options.url = apiUrl + options.url;
            options.crossDomain = true;
            var bearerToken = localStorage.getItem('bearerToken');
            if (bearerToken)
                return jqXHR.setRequestHeader(
                    'Authorization',
                    'Bearer ' + bearerToken);
        });

        var self = this;
        this.authService = authService;
        this.authService.LoggedIn.on(response => {
            self.session.authenticated = true;
            self.session.user = new user.UserModel({
                userName: response.UserName,
                lastLogin: response.LastLogin,
                email: response.Email
            });
            localStorage.setItem('bearerToken', response.access_token);
            //self.session.expirationDate = new Date(response['.expires']);
        });
    }
}