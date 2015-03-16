class AssetRepository {
    loadAsset(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset/${params.assetId}`;
        if (params.revision) {
            url += `/revisions/${params.revision}`;
        } 
        else if (params.uid) {
            url += `?uid=${params.uid}`;
        } 
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }

    loadRelatedAssets(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset/${params.assetId}/related?`;
        if (params.revision) {
            url += `&revision=${params.revision}`;
        } 
        else if (params.uid) {
            url += `&uid=${params.uid}`;
        }
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    } 

    loadBarcode(barcode) {
        var url = `/api/barcode/${barcode}`;
        return $.ajax({
            url: url,
            contentType: 'image/png',
            type: 'GET'
        });
    }

    loadTaxonomyPath(assetTypeId) {
        var url = `/api/assettype/${assetTypeId}/taxonomy`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    } 

    deleteAsset(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset/${params.assetId}`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'DELETE'
        });
    }

    restoreAsset(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset/${params.assetId}/restore`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'POST'
        });
    }

    validateAttribute(params) {
        var url = `/api/validation/attribute/${params.attributeId}/?value=${params.value}`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }
}

module.exports = AssetRepository;