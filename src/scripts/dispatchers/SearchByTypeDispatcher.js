import {Flux} from 'delorean';
import SearchByTypeStore from '../stores/SearchByTypeStore';

export default Flux.createDispatcher ({
  
  loadAssetTypes() {
    return this.dispatch('searchByType:assetTypes');
  },

  getStores() {
    return {
      searchByType: new SearchByTypeStore()
    }
  }
});