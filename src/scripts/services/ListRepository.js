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
        var url = `/api/assettype/${params.assetTypeId}/assets/`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET',
            data: params
        });
    }

    loadRoles() {
      var url = `/api/roles`;
      return $.ajax({
        url: url,
        contentType: 'application/json',
      });
    }
}

module.exports = ListRepository;
