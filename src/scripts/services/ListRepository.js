class ListRepository {
    loadDynamicList(params) {
        var url = `/api/dynlist/${params.dynamicListUid}`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }

    loadAssetsList(params) {
    	var rowStart = params.rowStart || 1;
    	var rowsNumber = params.rowsNumber || 20;
        var query = params.query || '';
        var url = `/api/assettype/${params.assetTypeId}/assets/?query=${query}`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }
}

module.exports = ListRepository;