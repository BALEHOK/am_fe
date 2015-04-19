var Flux = require('delorean').Flux;
var AssetRepository = require('../services/AssetRepository');

var AssetStore = Flux.createStore({

  asset: {
    name: undefined,
    revision: undefined,
    updatedAt: undefined,
    screens: [],
    barcode: undefined,
  },

  relatedAssets: [],

  taxonomyPath: undefined,

  validation: [],

  isValid: undefined,

  actions: {
    'asset:load': 'loadAsset',
    'asset:load-related': 'loadRelatedAssets',
    'asset:taxonomy-path': 'loadTaxonomyPath',
    'asset:delete': 'deleteAsset',
    'asset:restore': 'restoreAsset',
    'asset:barcode': 'loadBarcode',
    'asset:validate-attribute': 'validateAttribute',
    'asset:save': 'saveAsset',
  },

  initialize() {
    this.assetRepo = new AssetRepository();
  },

  loadAsset(params) {
    this.assetRepo.loadAsset(params).then((data) => {
      this.asset = data;
      this.emitChange();
    });
  },

  loadRelatedAssets(params) {
    this.assetRepo.loadRelatedAssets(params).then((data) => {
      this.relatedAssets = data;
      this.emitChange();
    });
  },

  loadTaxonomyPath(assetTypeId) {
    this.assetRepo.loadTaxonomyPath(assetTypeId).then((data) => {
      this.taxonomyPath = data;
      this.emitChange();
    });
  },

  deleteAsset(params) {
    this.assetRepo.deleteAsset(params).then(() => {
      this.asset.isDeleted = true;
      this.emitChange();
    });
  },

  restoreAsset(params) {
    this.assetRepo.restoreAsset(params).then(() => {
      this.asset.isDeleted = false;
      this.emitChange();
    });
  },

  loadBarcode(barcode) {
    this.assetRepo.loadBarcode(barcode).then((data) => {
      this.asset.barcode = data;
      this.emitChange();
    });
  },

  validateAttribute(params) {
    this.assetRepo.validateAttribute(params).then((data) => {
      this.validation[data.id] = data;
      this.emitChange();
    });
  },

  getValidationState() {
    var valResults = _.where(this.validation, {isValid: false});
    return _.size(valResults) == 0;
  },

  saveAsset(asset) {
    var self = this;
    var request = this.assetRepo.saveAsset(asset);
    request
      .done((data) => {
        self.emitChange();
      })
      .fail((jqXHR, textStatus) => {
        self.emitRollback();
        if (jqXHR.status == 400) {
          var validationResult = JSON.parse(jqXHR.responseText);
          if (validationResult && validationResult.modelState) {
            var keys = _.keys(validationResult.modelState);
            _.each(keys, (key) => {
              self.validation[key] = {
                id: key,
                message: validationResult.modelState[key][0],
                isValid: false
              };
            });
          }
        }
      });
    return request;
  },

  getState() {
    return  {
      asset: this.asset,
      relatedAssets: this.relatedAssets,
      taxonomyPath: this.taxonomyPath,
      validation: this.validation,
      isValid: this.getValidationState()
    };
  }
});

module.exports = AssetStore;