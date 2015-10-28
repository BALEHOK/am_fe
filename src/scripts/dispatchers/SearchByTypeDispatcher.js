import {Flux} from 'delorean';
import SearchByTypeStore from '../stores/SearchByTypeStore';

export default Flux.createDispatcher ({
  
  loadAssetTypes() {
    return this.dispatch('searchByType:assetTypes');
  },
  
  loadAssetAttributes(typeId) {
    return this.dispatch('searchByType:assetAttributes', typeId);
  },
  
  loadDataTypeOperators(dataType) {
    return this.dispatch('searchByType:dataTypeOperators', dataType);
  },

  getStores() {
    return {
      searchByType: new SearchByTypeStore()
    }
  }
});