class ListRepository {
    loadDynamicList(params) {
        var url = `/api/dynlist/${params.dynamicListUid}`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }

    loadZipcodes(params) {
        var url = `/api/zipcodes`;
        return $.ajax({
          url: url,
          contentType: 'application/json',
          data: {
            filter: params.filter,
            rowStart: params.rowStart,
            rowsNumber: params.rowsNumber
          }
        });
    }

    loadPlaces(params) {
      var url = `/api/places`;
      return $.ajax({
        url: url,
        contentType: 'application/json',
        data: {
          filter: params.filter,
          rowStart: params.rowStart,
          rowsNumber: params.rowsNumber
        }
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
