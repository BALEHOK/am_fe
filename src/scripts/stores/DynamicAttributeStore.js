import {Flux} from 'delorean';
import {always} from '../util/util';

import AssetTypeRepository from '../services/AssetTypeRepository';

export default Flux.createStore({
  dynLists: {},
  relatedAssets: {},

  actions: {
    'DynamicAttributeStore:dynList': 'loadDynList',
    'DynamicAttributeStore:relatedAssets': 'loadRelated'
  },

  initialize() {
    this.assetTypeRepo = new AssetTypeRepository();
  },

  loadDynList(listId) {
    // do not reload existing list
    if (!!this.dynLists[listId]){
      return;
    }

    always(
      this.assetTypeRepo.loadDynamicValueList(listId).then(
        (data) => {
          if (!data || !data.length){
            this.dynLists[listId] = [];
          } else {
            this.dynLists[listId] = data;
          }
        },
        () => {
          this.dynLists[listId] = [];
        }
      ),
      () => this.emitChange()
    );
  },

  getState() {
    return {
      dynLists: this.dynLists,
      relatedAssets: this.relatedAssets
    };
  }
});
