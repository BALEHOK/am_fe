class SearchRepository {
    search(params) {
        return $.ajax({
            url: '/api/search',
            contentType: 'application/json',
            data: {
                query: params.query,
                page: params.page,
                assetType: params.assetType,
                taxonomy: params.taxonomy,
                sortBy: params.sortBy
            },
            type: 'GET'
        });
    }

    counters(search) {
        return $.ajax({
            url: '/api/search/counters',
            contentType: 'application/json',
            data: { searchId: search.searchId, query: search.query },
            type: 'GET'
        })
    }
}

module.exports = SearchRepository;