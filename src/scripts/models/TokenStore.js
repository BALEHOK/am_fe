var CookieTokenStore = (function () {
    function CookieTokenStore() {
        this.tokenCookieName = "OAuthToken";
    }
    CookieTokenStore.prototype.getToken = function () {
        return this.getCookie(this.tokenCookieName);
    };

    CookieTokenStore.prototype.setToken = function (token) {
        document.cookie = this.tokenCookieName + '=' + token;
    };

    CookieTokenStore.prototype.removeToken = function () {
        document.cookie = this.tokenCookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    CookieTokenStore.prototype.getCookie = function (name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
    return CookieTokenStore;
})();
exports.CookieTokenStore = CookieTokenStore;

var LocalStorageTokenStore = (function () {
    function LocalStorageTokenStore() {
        this.tokenName = "bearerToken";
    }
    LocalStorageTokenStore.prototype.getToken = function () {
        return localStorage.getItem(this.tokenName);
    };
    LocalStorageTokenStore.prototype.setToken = function (token) {
        localStorage.setItem(this.tokenName, token);
    };
    LocalStorageTokenStore.prototype.removeToken = function () {
        localStorage.removeItem(this.tokenName);
    };
    return LocalStorageTokenStore;
})();
exports.LocalStorageTokenStore = LocalStorageTokenStore;
