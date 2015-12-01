import fetch from "../util/fetch";

export default class SearchRepository {
    search(params) {
        return fetch('/api/search').get({
            searchId: params.searchId,
            query: params.query,
            page: params.page,
            assetType: params.assetType,
            taxonomy: params.taxonomy,
            sortBy: params.sortBy,
            context: params.context,
            attributeId: params.attributeId,
            assetId: params.assetId
        });
    }

    searchByType(params, model) {
        return fetch('/api/search/bytype').post({
            searchId: model.searchId,
            assetType: model.assetType,
            assetTypeContext: model.assetTypeContext,
            attributes: model.attributes,
            page: params.page,
            taxonomy: params.taxonomy,
            sortBy: params.sortBy
        });
    }

    counters(search) {
        return fetch('/api/search/counters').get({
          searchId: search.searchId,
          query: search.query
        });
    }

    tracking(searchId) {
        return fetch('/api/search/tracking').get({ searchId: searchId });
    }
}
