import {Flux} from 'delorean';
import DynamicAttributeStore from '../stores/DynamicAttributeStore';

export default Flux.createDispatcher ({
  
  loadDynList(listId) {
    return this.dispatch('DynamicAttributeStore:dynList', listId);
  },

  getStores() {
    return {
      dynamicAttributeStore: new DynamicAttributeStore()
    }
  }
});