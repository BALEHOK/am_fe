class AssetRepository {
    loadAsset(params) {
        var url = `/api/assettype/${params.assetTypeUid}/asset/${params.assetUid}`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }

    loadRelatedAssets(params) {
        var url = `/api/assettype/${params.assetTypeUid}/asset/${params.assetUid}/related`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    } 

    loadAssetLists(params) {
        var url = `/api/assettype/${params.assetTypeUid}/asset/${params.assetUid}/lists`;
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
}

module.exports = AssetRepository;