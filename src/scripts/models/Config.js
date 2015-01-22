var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../typings/backbone/backbone.d.ts" />
var Config = (function (_super) {
    __extends(Config, _super);
    function Config() {
        _super.call(this);
        this.set('apiUrl', APIURL);
    }
    Object.defineProperty(Config.prototype, "apiUrl", {
        get: function () {
            return this.get('apiUrl');
        },
        enumerable: true,
        configurable: true
    });
    return Config;
})(Backbone.Model);
exports.Config = Config;
