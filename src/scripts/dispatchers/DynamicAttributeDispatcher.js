import {Flux} from 'delorean';
import DynamicAttributeStore from '../stores/DynamicAttributeStore';

export default Flux.createDispatcher ({
  
  loadDynList(listId) {
    return this.dispatch('DynamicAttributeStore:dynList', listId);
  },
  
  loadRelated(attributeId) {
    return this.dispatch('DynamicAttributeStore:relatedAssets', attributeId);
  },

  getStores() {
    return {
      dynamicAttributeStore: new DynamicAttributeStore()
    }
  }
});