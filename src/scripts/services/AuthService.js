/// <reference path="../../../typings/jquery/jquery.d.ts" />
var events = require('../util/LiteEvent');

var AuthService = (function () {
    function AuthService() {
        this.onLogin = new events.LiteEvent();
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            var bearerToken = localStorage.getItem('bearerToken');
            if (bearerToken)
                return jqXHR.setRequestHeader('Authorization', 'Bearer ' + bearerToken);
        });
    }
    Object.defineProperty(AuthService.prototype, "LoggedIn", {
        get: function () {
            return this.onLogin;
        },
        enumerable: true,
        configurable: true
    });

    AuthService.prototype.login = function (credentials) {
        credentials['grant_type'] = 'password';
        var self = this;
        var login = $.ajax({
            url: '/token',
            data: credentials,
            crossDomain: true,
            type: 'POST'
        });
        login.done(function (response) {
            self.onLogin.trigger(response);
        });
        return login;
    };

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
    AuthService.prototype.getAuthStatus = function () {
        var dfd = $.Deferred();
        $.ajax({
            url: '/api/auth',
            type: 'GET',
            crossDomain: true
        }).done(function () {
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
