/// <reference path="../../../typings/backbone/backbone.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Asset = (function (_super) {
    __extends(Asset, _super);
    function Asset(options) {
        _super.call(this, options);
    }
    Object.defineProperty(Asset.prototype, "assetTypeUid", {
        get: function () {
            return this.get('assetTypeUid');
        },
        set: function (value) {
            this.set('assetTypeUid', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Asset.prototype, "assetTypeId", {
        get: function () {
            return this.get('assetTypeId');
        },
        set: function (value) {
            this.set('assetTypeId', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Asset.prototype, "uid", {
        get: function () {
            return this.get('uid');
        },
        set: function (value) {
            this.set('uid', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Asset.prototype, "name", {
        get: function () {
            return this.get('name');
        },
        set: function (value) {
            this.set('name', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Asset.prototype, "screens", {
        get: function () {
            return this.get('screens');
        },
        set: function (value) {
            this.set('screens', value);
        },
        enumerable: true,
        configurable: true
    });
    return Asset;
})(Backbone.Model);
exports.Asset = Asset;

var AssetScreen = (function (_super) {
    __extends(AssetScreen, _super);
    function AssetScreen(options) {
        _super.call(this, options);
        this.panels = new Backbone.Collection(options.panels, { model: AssetPanel });
    }
    Object.defineProperty(AssetScreen.prototype, "panels", {
        get: function () {
            return this.get('panels');
        },
        set: function (value) {
            this.set('panels', value);
        },
        enumerable: true,
        configurable: true
    });
    return AssetScreen;
})(Backbone.Model);
exports.AssetScreen = AssetScreen;

var AssetPanel = (function (_super) {
    __extends(AssetPanel, _super);
    function AssetPanel(options) {
        _super.call(this, options);
        this.panelAttributes = new Backbone.Collection(options.attributes, { model: AssetAttribute });
    }
    Object.defineProperty(AssetPanel.prototype, "panelAttributes", {
        get: function () {
            return this.get('attributes');
        },
        set: function (value) {
            this.set('attributes', value);
        },
        enumerable: true,
        configurable: true
    });
    return AssetPanel;
})(Backbone.Model);
exports.AssetPanel = AssetPanel;

var AssetAttribute = (function (_super) {
    __extends(AssetAttribute, _super);
    function AssetAttribute(options) {
        _super.call(this, options);
    }
    Object.defineProperty(AssetAttribute.prototype, "uid", {
        get: function () {
            return this.get('uid');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetAttribute.prototype, "name", {
        get: function () {
            return this.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetAttribute.prototype, "value", {
        get: function () {
            return this.get('value');
        },
        set: function (value) {
            this.set('value', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetAttribute.prototype, "datatype", {
        get: function () {
            return this.get('datatype');
        },
        enumerable: true,
        configurable: true
    });
    return AssetAttribute;
})(Backbone.Model);
exports.AssetAttribute = AssetAttribute;
