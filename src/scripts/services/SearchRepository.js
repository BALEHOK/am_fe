import fetch from "fetchival";

export default class SearchRepository {
    search(params) {
        return fetch('/api/search').get({
            searchId: params.searchId,
            query: params.query,
            page: params.page,
            assetType: params.assetType,
            taxonomy: params.taxonomy,
            sortBy: params.sortBy,
            context: params.context
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
