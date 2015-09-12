var Flux = require('delorean').Flux;
var AssetStore = require('../stores/AssetStore');
var ListStore = require('../stores/ListStore');
var SearchTrackingStore = require('../stores/SearchTrackingStore');
var HistoryStore = require('../stores/HistoryStore');
var ReportStore = require('../stores/ReportStore');

var AssetDispatcher = Flux.createDispatcher({

  loadAsset(params) {
      return this.dispatch("asset:load", params);
  },

  loadRelatedAssets(params) {
      return this.dispatch("asset:load-related", params);
  },

  addAssetItem(asset) {
    return this.dispatch("list:add-asset", asset);
  },

  loadHistory(params) {
      return this.dispatch("history:load", params);
  },

  setListValues(assets) {
      return this.dispatch('list:currentVals', assets);
  },

  generateBarcode(params) {
      return this.dispatch('barcode:generate', params);
  },

  loadList(params) {
      return this.dispatch('list:load', params);
  },

  loadRoles() {
    return this.dispatch('list:roles');
  },

  loadDynamicList(params) {
    return this.dispatch("list:dynlists", params);
  },

  pushAsset() {
    return this.dispatch("asset:push");
  },

  popAsset() {
    return this.dispatch("asset:pop");
  },

  setAttribute(id, value, forceRecalc) {
    return this.dispatch("asset:set-attr", {id, value, forceRecalc});
  },

  loadAssetsList(params) {
    return this.dispatch("list:assets", params);
  },

  loadTaxonomyPath(assetTypeId) {
    return this.dispatch("asset:taxonomy-path", assetTypeId);
  },

  loadSearchTracking(searchId) {
    return this.dispatch("search:tracking", searchId);
  },

  deleteAsset(params) {
    return this.dispatch("asset:delete", params);
  },

  restoreAsset(params) {
    return this.dispatch("asset:restore", params);
  },

  loadBarcode(barcode) {
    return this.dispatch("asset:barcode", barcode);
  },

  validateAttribute(params) {
    return this.dispatch("asset:validate-attribute", params);
  },

  clearAttributeValidation(params) {
    return this.dispatch("asset:clear-attribute-validation", params);
  },

  saveAsset() {
    return this.dispatch("asset:save");
  },

  loadAssetTypes() {
    return this.dispatch("list:assettypes");
  },

  loadReports(assetTypeId) {
    return this.dispatch('reports:load', assetTypeId);
  },

  setValidationResult(result) {
    return this.dispatch('asset:set-validation', result);
  },

  recalculate() {
    return this.dispatch('asset:recalc');
  },

  getStores() {
    return {
      asset: new AssetStore(),
      list: new ListStore(),
      search: new SearchTrackingStore(),
      history: new HistoryStore(),
      report: new ReportStore(),
    }
  }
});

module.exports = AssetDispatcher;
