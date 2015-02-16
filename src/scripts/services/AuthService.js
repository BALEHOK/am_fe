/// <reference path="../../../typings/jquery/jquery.d.ts" />
var events = require('../util/LiteEvent');

var AuthService = (function () {
    function AuthService() {
        this.onAuth = new events.LiteEvent();
    }
    Object.defineProperty(AuthService.prototype, "OnLogin", {
        get: function () {
            return this.onAuth;
        },
        enumerable: true,
        configurable: true
    });

    AuthService.prototype.login = function (credentials) {
        credentials['grant_type'] = 'password';
        var self = this;
        var login = $.ajax({
            url: '/token',
            type: 'POST',
            data: credentials
        });
        login.done(function (response) {
            self.onAuth.trigger(response);
        });
        return login;
    };

    AuthService.prototype.getAuthStatus = function () {
        var dfd = $.Deferred();
        var self = this;
        $.ajax({
            url: '/api/auth',
            type: 'GET'
        }).done(function (response) {
            self.onAuth.trigger(response);
            dfd.resolve(true);
        }).fail(function (response) {
            if (response.status === 401) {
                dfd.resolve(false);
            } else {
                dfd.reject();
            }
        });
        return dfd;
    };
    return AuthService;
})();
exports.AuthService = AuthService;
