import fetch from '../util/fetch';
import Consts from '../util/searchConsts';

class SearchModelRepository {
    models = {}

    searchByType(params, typeSearchAttribs) {
        var model = {
            searchId: params.searchId,
            page: params.page,
            assetType: params.assetType,
            taxonomy: params.taxonomy,
            sortBy: params.sortBy,
            context: params.context,
            attribs: typeSearchAttribs
        };
        
        fetch('/api/search/bytype/model').post(model)
            .then(r => console.log(r));

        return fetch('/api/search/bytype').post(model);
    }

    createSearchModel(){
        var searchId = new Date().getTime() % 1000;

        return {
            searchId: searchId,
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

        return fetch('/api/search/bytype/model').get(searchId);
    }

    saveSerchModel(model){
        // store in models array (the fastest access)
        this.models[model.searchId] = model;

        // save in localStore (page reloads)
        localStorage.searchByTypeModel = model;

        // store on server
        // (page reloads and search in different tabs - the slowest one but survives any cllient actions)
        return fetch('/api/search/bytype/model').post(model);
    }
}

export default new SearchModelRepository();