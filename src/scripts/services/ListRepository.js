class ListRepository {
    loadDynamicList(params) {
        var url = `/api/dynlist/attribute/${params.attributeId}`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }

    loadZipcodes(params) {
        return this.loadList('/api/zipcodes', params)
    }

    loadList(url, params) {
        return $.ajax({
            url: url,
            contentType: 'application/json',
            data: {
                filter: params.filter,
                rowStart: params.rowStart,
                rowsNumber: params.rowsNumber,
                query: params.filter
            }
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

    loadAssetTypes() {
        var url = `/api/assettype`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
        });
    }
}

module.exports = ListRepository;
