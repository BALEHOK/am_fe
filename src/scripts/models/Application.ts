/// <reference path="../../../typings/backbone/backbone.d.ts" />
import config = require('./Config');
import session = require('./Session');
import user = require('./User');
import tokenStore = require('./TokenStore');
import authServiceModule = require('../services/AuthService');
import exceptionsModule = require('../exceptions');

export class Application extends Backbone.Model {

    public get Session() {
        return this.session;
    }

    authService: authServiceModule.IAuthService;
    private session: session.SessionModel = new session.SessionModel();
    private config: config.Config;
    private tokenStore: tokenStore.ITokenStore;

    constructor(config: config.Config, 
        authService: authServiceModule.IAuthService, 
        tokenStore: tokenStore.ITokenStore) {

        super();
        var self = this;
        if (config == null)
            throw new exceptionsModule.ArgumentNullException('config is null');
        if (authService == null)
            throw new exceptionsModule.ArgumentNullException('authService is null');
        if (tokenStore == null)
            throw new exceptionsModule.ArgumentNullException('tokenStore is null');

        this.authService = authService;  
        this.config = config;
        this.tokenStore = tokenStore;

        $.ajaxPrefilter((options) => {
            options.url = config.apiUrl + options.url;
            options.crossDomain = true;
            if (!options.beforeSend) {
                options.beforeSend = xhr => {
                    var bearerToken = self.tokenStore.getToken();
                    if (bearerToken && options.url != config.apiUrl + '/token')
                        xhr.setRequestHeader(
                            'Authorization',
                            'Bearer ' + bearerToken);
                }
            }
        });
        
        this.authService.OnAuthInfo.on(response => {
            //console.log(response);
            if (response.access_token)
                self.tokenStore.setToken(response.access_token); 
            self.session.user = new user.UserModel({
                userName: response.userName,
                lastLogin: response.lastLogin,
                email: response.email
            });
        });
    }

    logout() {
        this.tokenStore.setToken(null);
    }
}
