import {Flux} from 'delorean';
import SearchComplexFormStore from '../stores/SearchComplexFormStore';

export default Flux.createDispatcher ({
  
  loadAssetTypes() {
      return this.dispatch('searchComplexForm:assetTypes');
  },

  getStores() {
    return {
      searchComplexForm: new SearchComplexFormStore()
    }
  }
});