import {Flux} from 'delorean';
import {always} from '../util/util';

import AssetTypeRepository from '../services/AssetTypeRepository';

export default Flux.createStore({
  assetTypes: [],
  assetAttributes: {},
  dataTypeOperators: {},

  actions: {
    'searchByType:assetTypes': 'loadAssetTypes',
    'searchByType:assetAttributes': 'loadAssetAttributes',
    'searchByType:dataTypeOperators': 'loadDataTypeOperators'
  },

  initialize() {
    this.assetTypeRepo = new AssetTypeRepository();
  },

  loadAssetTypes() {
    always(
      this.assetTypeRepo.loadAssetTypes().then(
        (data) => {
          if (!data.activeTypes || !data.activeTypes.length){
            this.assetTypes = [];
            return;
          }

          var assetTypes = [];
          for (var i = 0; i < data.activeTypes.length; i++) {
            var type = data.activeTypes[i];
            var typeModel = {
              id: type.id,
              name: type.displayName
            }

            assetTypes.push(typeModel);
          };
          
          this.assetTypes = assetTypes;
        },
        () => {
          this.assetTypes = [];
        }
      ),
      () => this.emitChange());
  },

  loadAssetAttributes(typeId) {
    always(
      this.assetTypeRepo.loadAssetAttributes(typeId).then(
        (data) => {
          if (!data.attributes || !data.attributes.length){
            this.assetAttributes[typeId] = [];
            return;
          }
          
          this.assetAttributes[typeId] = data.attributes;
        },
        () => {
          this.assetAttributes[typeId] = [];
        }
      ),
      () => this.emitChange());
  },

  loadDataTypeOperators(dataType) {
    if (!!this.dataTypeOperators[dataType]){
      this.emitChange();
    }

    always(
      this.assetTypeRepo.loadDataTypeOperators(dataType).then(
        (data) => {
          if (!data || !data.length){
            this.dataTypeOperators[dataType] = [];
            return;
          }
          
          this.dataTypeOperators[dataType] = data;
        },
        () => {
          this.dataTypeOperators[dataType] = [];
        }
      ),
      () => this.emitChange());
  },

  getState() {
    return {
      assetTypes: this.assetTypes,
      assetAttributes: this.assetAttributes,
      dataTypeOperators: this.dataTypeOperators
    };
  }
});
