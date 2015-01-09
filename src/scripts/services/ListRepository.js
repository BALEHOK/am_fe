class ListRepository {
    loadDynamicList(params) {
        var url = `/api/dynlist/${params.dynamicListUid}`;
        var url = `/api/assettype/${params.assetTypeUid}/asset/${params.assetUid}/attribute/${params.attributeUid}/dynlists`;
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
        var url = `/api/assettype/id/${params.assetTypeId}/assets/?query=${query}`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }
}

module.exports = ListRepository;