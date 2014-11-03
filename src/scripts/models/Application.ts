/// <reference path="../../../typings/backbone/backbone.d.ts" />
import config = require('./Config');
import session = require('./Session');
import user = require('./User');
import authServiceModule = require('../services/AuthService');
import searchServiceModule = require('../services/SearchService');
import exceptionsModule = require('../exceptions');

export class Application extends Backbone.Model {

    public get Session() {
        return this.session;
    }

    authService: authServiceModule.IAuthService;
    searchService: searchServiceModule.ISearchService;

    private session: session.SessionModel = new session.SessionModel();
    private config: config.Config;

    constructor(config: config.Config, authService: authServiceModule.IAuthService) {
        super();
        if (config == null)
            throw new exceptionsModule.ArgumentNullException('config is null');
        if (authService == null)
            throw new exceptionsModule.ArgumentNullException('authService is null');
        this.config = config;
        $.ajaxPrefilter((options) => {
            options.url = config.apiUrl + options.url;
            options.crossDomain = true;
            if (!options.beforeSend) {
                options.beforeSend = xhr => {
                    var bearerToken = localStorage.getItem('bearerToken');
                    if (bearerToken && options.url != config.apiUrl + '/token')
                        xhr.setRequestHeader(
                            'Authorization',
                            'Bearer ' + bearerToken);
                }
            }
        });
        var self = this;
        this.searchService = new searchServiceModule.SearchService();

        this.session.on('change:authenticated', function(model, authenticated) {
            if (!authenticated) {
                // client-side logout
                localStorage.setItem('bearerToken', null);
            }
        });

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
