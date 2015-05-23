class AssetRepository {
    loadAsset(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset`;
        if (params.assetId) {
            url += `/${params.assetId}`
        }
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

    saveAsset(asset) {
        var url = `/api/assettype/${asset.assetTypeId}/asset`;
        if (asset.id)
            url += `/${asset.id}`;

        return $.ajax({
            type: asset.id
                ? 'POST'
                : 'PUT',
            url: url,
            data: JSON.stringify(asset),
            contentType: "application/json; charset=utf-8",
        });
    }

    validateAttribute(params) {
        var url = `/api/validation/attribute/${params.attributeId}`;
        return $.ajax({
            url: url,
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            data: '=' + params.value,
            type: 'POST'
        });
    }
}

module.exports = AssetRepository;
