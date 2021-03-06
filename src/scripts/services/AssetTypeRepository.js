import fetch from "../util/fetch";

export default class AssetTypeRepository {
    loadAssetTypes() {
        var url = '/api/assettype';
        return fetch(url).get();
    }

    loadAssetAttributes(typeId) {
        var url = `/api/assettype/${typeId}`;
        return fetch(url).get();
    }

    loadChildAssetTypes(typeId) {
        var url = `/api/assettype/${typeId}/child`;
        return fetch(url).get();
    }

    loadDataTypeOperators(dataType){
      var url = `/api/datatype/${dataType}/operators`;
      return fetch(url).get();
    }

    loadDynamicValueList(listId){
      var url = `/api/datatype/listitems/${listId}`;
      return fetch(url).get();
    }
}