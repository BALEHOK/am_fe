class SearchRepository {
    search(params) {        
        return $.ajax({
            url: '/api/search',
            contentType: 'application/json',
            data: {
                searchId: params.searchId,
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

    tracking(searchId) {
        return $.ajax({
            url: '/api/search/tracking',
            contentType: 'application/json',
            data: { searchId: searchId },
            type: 'GET'
        })
    }
}

module.exports = SearchRepository;