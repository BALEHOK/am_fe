var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SessionModel = (function (_super) {
    __extends(SessionModel, _super);
    function SessionModel() {
        _super.call(this);
    }
    Object.defineProperty(SessionModel.prototype, "user", {
        get: function () {
            return this.get('user');
        },
        set: function (value) {
            this.set('user', value);
        },
        enumerable: true,
        configurable: true
    });

    return SessionModel;
})(Backbone.Model);
exports.SessionModel = SessionModel;
