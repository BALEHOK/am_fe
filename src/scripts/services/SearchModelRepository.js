import Consts from '../util/searchConsts';

export default class SearchModelRepository {
    model = null

    constructor(){
        var json = localStorage.lastSearch;
        if (json){
            model = JSON.parse(json);
        } else {
            model = {
                assetType: null,
                assetTypeContext: Consts.assetTypeContext.active,
                attributes: []
            }
        }
    }

    getByTypeModel(){
        return this.model;
    }

    setByTypeModel(model){
        this.model = model;
        
        localStorage.lastSearch = JSON.stringify(model);
    }
}