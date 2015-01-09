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
        var url = `/api/assettype/${params.assetTypeUid}/asset/${params.assetUid}/attribute/${params.attributeUid}/assets`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }    
}

module.exports = AssetRepository;