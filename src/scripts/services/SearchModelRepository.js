import fetch from '../util/fetch';
import Consts from '../util/searchConsts';

class SearchModelRepository {
    models = {}

    generateSearchId(){
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
            
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
    }

    createSearchModel(){
        return {
            searchId: '',
            assetType: null,
            assetTypeContext: Consts.assetTypeContext.active,
            attributes: []
        };
    }

    getSerchModel(searchId){
        if (this.models[searchId]) {
            return Promise.resolve(this.models[searchId]);
        }

        var json = localStorage.searchByTypeModel;
        if (json){
          var model = JSON.parse(json);
          if (model.searchId == searchId) {
            return Promise.resolve(model);
          };
        }

        return fetch('/api/search/bytype/model').get({searchId: searchId});
    }

    saveSerchModel(model){
        // store in models array (the fastest access)
        this.models[model.searchId] = model;

        // save in localStore (page reloads)
        localStorage.searchByTypeModel = JSON.stringify(model);

        // store on server
        // (page reloads and search in different tabs - the slowest one but survives any cllient actions)
        return fetch('/api/search/bytype/model').post(model);
    }
}

export default new SearchModelRepository();