var Flux = require('delorean').Flux;
var AssetRepository = require('../services/AssetRepository');
var BarcodeRepository = require('../services/BarcodeRepository');
var TaskRepository = require('../services/TaskRepository');
var _ = require('underscore');

var defaultAsset = {
  id: undefined,
  name: undefined,
  revision: undefined,
  updatedAt: undefined,
  screens: [],
  barcode: undefined
};

var AssetStore = Flux.createStore({

  asset: _.extend({}, defaultAsset),

  screenIndex: 0,

  assetStack: [],

  relatedAssets: [],

  taxonomyPath: undefined,

  validation: [],

  isValid: undefined,

  calculating: false,

  barcodeBase64: null,

  isEdited: false,

  topElemDataParamId: null,

  tasksList: [],

  taskResponse: {
      status: null,
      result: null,
      errors: [],
      shouldRedirectOnComplete: false,
      taskFunctionType: null,
      taskName: null,
  },

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
    'asset:push': 'pushAsset',
    'asset:pop': 'popAsset',
    'asset:set-attr': 'setAttribute',
    'asset:add-related': 'addRelated',
    'asset:set-validation': 'setValidation',
    'asset:recalc': 'recalc',
    'asset:clear-attribute-validation': 'clearAttributeValidation',
    'asset:change-screen': 'changeScreen',
    'asset:save-position': 'saveTopElemPos',
    'asset:loadTasks': 'loadTasks',
    'asset:taskExec': 'executeTask',
    'asset:clearTaskResponse': 'clearTaskResponse',
  },

  initialize() {
    this.assetRepo = new AssetRepository();
    this.barcodeRepo = new BarcodeRepository();
    this.taskRepo = new TaskRepository();
    var self = this;
    this.delayedCalculation = _.debounce((forceRecalc) => {
        self.calculateAsset(forceRecalc);
    }, 500);
    this.delayedValidation = _.debounce((params) => {
        self.validateAttribute({
            attributeId: params.id,
            value: params.value
        });
    }, 500);
  },

  changeScreen(screenIndex) {
    this.screenIndex = screenIndex;
    this.emitChange();
  },

  recalc() {
    this.delayedCalculation(this.asset, true);
  },

  setAttribute({id, value, forceRecalc}) {
    id = parseInt(id);
    var attributes = this.asset.screens
      .reduce(((acc, scrn) => acc.concat(scrn.panels)), [])
      .reduce(((acc, panel) => acc.concat(panel.attributes)), []);

    attributes
      .filter(att => att.id === id)
      .forEach(att => {
        if (att.datatype == 'assets') {
          if (!_.isArray(att.value))
            att.value = [];
          att.value.push(value);
        } else {
          att.value = value;
        }
      });

    if (_.any(attributes, a => a.hasFormula && !a.value) || forceRecalc) {
        this.delayedCalculation(this.asset, forceRecalc);
    } else {
        this.delayedValidation({id, value});
    }

    this.isEdited = true;
    this.emitChange();
  },

  addRelated(asset) {

  },

  loadAsset(params) {
    this.assetRepo.loadAsset(params).then((data) => {
      this.asset = data;
      this.validation = [];
      this.isValid = undefined;
      this.screenIndex = _.chain(data.screens)
          .findIndex({isDefault: true})
          .value();
      this.emitChange();
    }).catch(err => {
        if (err.response && err.response.status === 404) {
            this.asset = null;
            this.emitChange();
        } else {
            throw err;
        }
    });
  },

  pushAsset() {
    this.assetStack.push({
      asset: this.asset,
      screenIndex: this.screenIndex,
      relatedAssets: this.relatedAssets,
      taxonomyPath: this.taxonomyPath,
      validation: this.validation
    });
    this.emitChange();
  },

  popAsset() {
    let restore = this.assetStack.pop();
    if(restore) {
      this.screenIndex = restore.screenIndex;
      this.asset = restore.asset;
      this.relatedAssets = restore.relatedAssets;
      this.taxonomyPath = restore.taxonomyPath;
      this.validation = restore.validation;
      this.emitChange();
    }
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
    return this.assetRepo.deleteAsset(params).then(() => {
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
        this.validation[params.id] = {isValid:true};
          this.barcodeBase64 = data.base64Image;
          var attr = this.getAttribute(params.id, params.screenId);
          attr.value = data.barcode;
          this.emitChange();
      });
  },

  restoreAsset(params) {
    return this.assetRepo.restoreAsset(params).then(() => {
      this.asset.isDeleted = false;
      this.emitChange();
    });
  },

  loadBarcode(barcode) {
    this.assetRepo.loadBarcode(barcode).then((data) => {
      this.barcodeBase64 = data;
      this.emitChange();
    });
  },

  validateAttribute(params) {
    this.assetRepo.validateAttribute(params).then((data) => {
      this.setValidation(data);
    });
  },

  clearAttributeValidation(params) {
    var data = {
        $id: "1",
        id: params.attributeId,
        isValid: true,
        message: "",
        clearState: true,
    };
    this.setValidation(data);
  },

  setValidation(result) {
    this.validation[result.id] = result;
    this.emitChange();
  },

  getValidationState() {
    var valResults = _.where(this.validation, {isValid: false});
    return _.size(valResults) == 0;
  },

  saveAsset() {
    var self = this;
    var screenId = this.asset.screens[this.screenIndex].id;
    var request = this.assetRepo.saveAsset(this.asset, screenId);
    request
      .then((result) => {
        self.asset.id = result.id;
        self.asset.name = result.name;
        self.emitChange();
      })
      .catch((err) => {
        self.emitRollback();
        if (err.response && err.response.status == 400) {
          err.response.json().then(validationResult => {
            if (validationResult && validationResult.modelState) {
                self._setValidationResult(validationResult);
                self.emitChange();
            }
          });
        } else {
          throw err;
        }
      });
    return request;
  },

  calculateAsset(forceRecalc) {
    var self = this;
    self.calculating = true;
    self.emitChange();
    var screenId = this.asset.screens[this.screenIndex].id;
    var request = this.assetRepo.calculateAsset(this.asset, screenId, forceRecalc);
    request
      .then((result) => {
        self.calculating = false;
        self.asset = result;
        self.validation.forEach((o,i) => {
            self.validation[i] = {isValid:true, id: i};
        })
        self.emitChange();
      })
      .catch((err) => {
        self.calculating = false;
        self.emitRollback();
        if (err.response && err.response.status == 400) {
          err.response.json().then(validationResult => {
            if (validationResult && validationResult.modelState) {
                self._setValidationResult(validationResult);
                self.emitChange();
            }
          });
        } else {
          throw err;
        }
      });
  },

  saveTopElemPos(dataParamId) {
    this.topElemDataParamId = parseInt(dataParamId);
    this.emitChange();
  },

  loadTasks(assetTypeId) {
      this.taskRepo.loadTasks(assetTypeId).then((data) => {
          this.tasksList = data;
          this.emitChange();
      });
  },

  executeTask(taskId) {
      this.taskRepo.executeTask(taskId).then((data) => {
          this.taskResponse = data;
          this.emitChange();
      });
  },

  clearTaskResponse() {
      this.taskResponse = {
          status: null,
          result: null,
          errors: [],
          shouldRedirectOnComplete: false,
          taskFunctionType: null,
          taskName: null,
      };
      this.emitChange();
  },

  _setValidationResult(validationResult) {
    _.chain(validationResult.modelState)
      .keys()
      .map(k => { return parseInt(k); })
      .filter(k => !_.isNaN(k))
      .each(key => {
        this.validation[key] = {
          id: key,
          message: validationResult.modelState[key][0],
          isValid: false
        };
      });

    // general errors (which aren't related to any attribute)
    if(validationResult.modelState[""]) {
        this.validation[""] = [];
        validationResult.modelState[""].map(e => {
            this.validation[""].push({
              message: e,
              isValid: false
            });
        });
    }
  },

  getState() {
    return  {
      asset: this.asset,
      relatedAssets: this.relatedAssets,
      taxonomyPath: this.taxonomyPath,
      validation: this.validation,
      isValid: this.getValidationState(),
      isEdited: this.isEdited,
      barcodeBase64: this.barcodeBase64,
      calculating: this.calculating,
      topElemDataParamId: this.topElemDataParamId,
      currentScreen: () => {
        return this.asset
            ? this.asset.screens[this.screenIndex] || {panels: [], hasFormula:false}
            : null;
      }(),
      tasksList: this.tasksList,
      taskResponse: this.taskResponse
    };
  }
});

module.exports = AssetStore;
