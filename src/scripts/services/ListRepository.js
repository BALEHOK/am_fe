import fetch from "../util/fetch";

export default class ListRepository {
    loadDynamicList(params) {
        var url = `/api/dynlist/attribute/${params.attributeId}`;
        return fetch(url).get();
    }

    loadZipcodes(params) {
        return this.loadList('/api/zipcodes', params)
    }

    loadList(url, params) {
        return fetch(url).get({
            filter: params.filter,
            rowStart: params.rowStart,
            rowsNumber: params.rowsNumber,
            query: params.filter
        });
    }

    loadDocs(params) {
        return this.loadList('/api/documents', params);
    }

    loadPlaces(params) {
        return this.loadList('/api/places', params);
    }

    loadAssetsList(params) {
        var rowStart = params.rowStart || 1;
        var rowsNumber = params.rowsNumber || 20;
        var query = params.query || '';
        var url = `/api/assettype/${params.assetTypeId}/assets/`;
        return fetch(url).get(params);
    }

    loadRoles() {
        var url = `/api/roles`;
        return fetch(url).get();
    }

    loadAssetTypes() {
        var url = `/api/assettype`;
        return fetch(url).get();
    }
}
