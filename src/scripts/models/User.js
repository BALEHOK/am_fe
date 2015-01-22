var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../typings/backbone/backbone.d.ts" />
/// <reference path="../../../typings/moment/moment.d.ts" />
var moment = require('moment');
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel(data) {
        _super.call(this);
        for (var key in data) {
            if (key) {
                this[key] = data[key];
            }
        }
    }
    Object.defineProperty(UserModel.prototype, "userName", {
        get: function () {
            return this.get('userName');
        },
        set: function (value) {
            this.set('userName', value);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(UserModel.prototype, "email", {
        get: function () {
            return this.get('email');
        },
        set: function (value) {
            this.set('email', value);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(UserModel.prototype, "lastLogin", {
        get: function () {
            return moment(this.get('lastLogin'));
        },
        set: function (value) {
            this.set('lastLogin', value);
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(UserModel.prototype, "userpicPath", {
        get: function () {
            return this.get('userpicPath');
        },
        set: function (value) {
            this.set('userpicPath', value);
        },
        enumerable: true,
        configurable: true
    });

    return UserModel;
})(Backbone.Model);
exports.UserModel = UserModel;
