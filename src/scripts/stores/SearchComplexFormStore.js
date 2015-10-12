import {Flux} from 'delorean';
import {always} from '../util/util';

import AssetTypeRepository from '../services/AssetTypeRepository';

export default Flux.createStore({
  assetTypes: [],

  actions: {
    'searchComplexForm:assetTypes': 'loadAssetTypes'
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

  getState() {
    return {
      assetTypes: this.assetTypes
    };
  }
});
