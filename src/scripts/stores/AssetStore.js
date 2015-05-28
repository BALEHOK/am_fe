var Flux = require('delorean').Flux;
var AssetRepository = require('../services/AssetRepository');
var BarcodeRepository = require('../services/BarcodeRepository');

var AssetStore = Flux.createStore({

  asset: {
    id: undefined,
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
    'barcode:generate': 'generateBarcode',
  },

  initialize() {
    this.assetRepo = new AssetRepository();
    this.barcodeRepo = new BarcodeRepository();
  },

  loadAsset(params) {
    this.assetRepo.loadAsset(params).then((data) => {
      this.asset = data;
      this.validation = [];
      this.isValid = undefined;
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

  getAttribute(id, screenId) {
      var screens = screenId
        ? this.asset.screens.filter(el => el.id === screenId)
        : this.asset.screens
      return screens
        .reduce((acc, el) => acc.concat(el.panels), [])
        .reduce((acc, el) => acc.concat(el.attributes), [])
        .filter(el => el.id === id)[0];
  },

  generateBarcode(params) {
      this.barcodeRepo.generate().then((data) => {
          this.asset.barcode = data.base64Image;
          var attr = this.getAttribute(params.id, params.screenId);
          attr.value = data.barcode;
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
      .then((id) => {
        self.asset.id = id;
        self.emitChange();
      })
      .fail((jqXHR, textStatus) => {
        self.emitRollback();
        if (jqXHR.status == 400) {
          var validationResult = JSON.parse(jqXHR.responseText);
          if (validationResult && validationResult.modelState) {
            _.chain(validationResult.modelState)
              .keys()
              .map(k => { return parseInt(k); })
              .filter(k => !_.isNaN(k))
              .each(key => {
                self.validation[key] = {
                  id: key,
                  message: validationResult.modelState[key][0],
                  isValid: false
                };
              })
              .value();
            self.emitChange();
          }
        } else {
            console.log(jqXHR);
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
