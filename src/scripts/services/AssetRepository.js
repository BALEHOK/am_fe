class AssetRepository {
    loadAsset(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset/${params.assetId}`;
        if (params.revision) {
            url += `/revisions/${params.revision}`;
        }
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }

    loadRelatedAssets(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset/${params.assetId}/related`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
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
        
    }
}

module.exports = AssetRepository;