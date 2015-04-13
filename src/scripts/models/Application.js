var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var user = require('./User');
var exceptionsModule = require('../exceptions');

var Application = (function (_super) {
    __extends(Application, _super);
    function Application(config, authService, tokenStore) {
        _super.call(this);
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

        var userData = localStorage.getItem('user');
        if (userData)
            this.user = JSON.parse(userData);

        $.ajaxPrefilter(function (options) {
            options.url = config.apiUrl + options.url;
            options.crossDomain = true;
            if (!options.beforeSend) {
                options.beforeSend = function (xhr) {
                    var bearerToken = self.tokenStore.getToken();
                    if (bearerToken && options.url != config.apiUrl + '/token')
                        xhr.setRequestHeader('Authorization', 'Bearer ' + bearerToken);
                };
            }
        });

        this.authService.OnLogin.on(function (response) {
            if (response.access_token)
                self.tokenStore.setToken(response.access_token);
            self.user = new user.UserModel({
                userName: response.userName,
                lastLogin: response.lastLogin,
                email: response.email
            });
            localStorage.setItem('user', JSON.stringify(self.user));
        });
    }

    Application.prototype.logout = function () {
        this.user = null;
        localStorage.removeItem('user');
        this.tokenStore.removeToken();
    };
    return Application;
})(Backbone.Model);
exports.Application = Application;
