import {Flux} from 'delorean';
import {always} from '../util/util';

import AssetTypeRepository from '../services/AssetTypeRepository';

export default Flux.createStore({
  dynLists: {}

  actions: {
    'DynamicAttributeStore:dynList': 'loadDynList'
  },

  initialize() {
    this.assetTypeRepo = new AssetTypeRepository();
  },

  loadDynList(listId) {
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
      () => this.emitChange());
  },

  getState() {
    return {
      dynLists: this.dynLists,
    };
  }
});
