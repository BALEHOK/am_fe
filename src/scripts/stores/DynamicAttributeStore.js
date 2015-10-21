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
    this.loadDataIfNeeded('dynLists', listId, 'loadDynamicValueList');
  },

  loadRelated(attributeId) {
    this.loadDataIfNeeded('relatedAssets', attributeId, 'loadRelatedAssets');
  },

  loadDataIfNeeded(name, id, repoAction) {
    // do not reload existing list
    if (!!this[name][id]){
      return;
    }

    always(
      this.assetTypeRepo[repoAction](id).then(
        (data) => {
          if (!data || !data.length){
            this[name][id] = [];
          } else {
            this[name][id] = data;
          }
        },
        () => {
          this[name][id] = [];
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
