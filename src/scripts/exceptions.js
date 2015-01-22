var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExceptionBase = (function () {
    function ExceptionBase() {
    }
    ExceptionBase.prototype.toString = function () {
        return this.message;
    };
    return ExceptionBase;
})();
exports.ExceptionBase = ExceptionBase;
var ArgumentNullException = (function (_super) {
    __extends(ArgumentNullException, _super);
    function ArgumentNullException(message) {
        _super.call(this);
        this.name = 'ArgumentNullException';
        this.message = 'Argument is null or empty';
        if (message) {
            this.message = message;
        }
    }
    return ArgumentNullException;
})(ExceptionBase);
exports.ArgumentNullException = ArgumentNullException;
