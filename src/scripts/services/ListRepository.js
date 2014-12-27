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
        var url = `/api/assettype/id/${params.assetTypeId}/asset/?query=${query}&rowStart=${rowStart}&rowsNumber=${rowsNumber}`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }
}

module.exports = ListRepository;