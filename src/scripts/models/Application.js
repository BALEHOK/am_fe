var exceptionsModule = require('../exceptions');

class Application  {
    constructor (authService, tokenStore) {
        var self = this;
        if (authService == null)
            throw new exceptionsModule.ArgumentNullException('authService is null');
        if (tokenStore == null)
            throw new exceptionsModule.ArgumentNullException('tokenStore is null');

        this.authService = authService;
        this.tokenStore = tokenStore;

        var userData = localStorage.getItem('user');
        if (userData)
            this.user = JSON.parse(userData);

        $.ajaxPrefilter(function (options) {
            options.url = APIURL + options.url;
            options.crossDomain = true;
            if (!options.beforeSend) {
                options.beforeSend = function (xhr) {
                    var bearerToken = self.tokenStore.getToken();
                    if (bearerToken && options.url != APIURL + '/token')
                        xhr.setRequestHeader('Authorization', 'Bearer ' + bearerToken);
                };
            }
        });

        $( document ).ajaxComplete(function( event, xhr, settings ) {
            if (xhr.status == 401) {
                self.logout();
            }
        });

        this.authService.OnLogin.on(function (response) {
            if (response.access_token)
                self.tokenStore.setToken(response.access_token);
            self.user = {
                userName: response.userName,
                lastLogin: response.lastLogin,
                email: response.email
            };
            localStorage.setItem('user', JSON.stringify(self.user));
        });
    }

    logout () {
        this.user = null;
        localStorage.removeItem('user');
        this.tokenStore.removeToken();
    }
}
exports.Application = Application;
