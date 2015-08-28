import fetch from "../util/fetch";

export default class AssetRepository {
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
        return fetch(url).get();
    }

    loadRelatedAssets(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset`;

        if (params.assetId) {
            url += `/${params.assetId}`;
        }

        url += '/related?';

        if (params.revision) {
            url += `&revision=${params.revision}`;
        }
        else if (params.uid) {
            url += `&uid=${params.uid}`;
        }

        return fetch(url).get();
    }

    loadBarcode(barcode) {
        var url = `/api/barcode/${barcode}`;
        return fetch(url).get();
    }

    loadTaxonomyPath(assetTypeId) {
        var url = `/api/assettype/${assetTypeId}/taxonomy`;
        return fetch(url).get();
    }

    deleteAsset(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset/${params.assetId}`;
        return fetch(url, {
          responseAs: 'text'
        }).delete();
    }

    restoreAsset(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset/${params.assetId}/restore`;
        return fetch(url, {
          responseAs: 'text'
        }).post();
    }

    saveAsset(asset, screenId) {
        var url = `/api/assettype/${asset.assetTypeId}/asset`;
        if (asset.id)
            url += `/${asset.id}`;
        url += `?screenId=${screenId}`;

        let resp = fetch(url, {
          body: JSON.stringify(asset)
        });
        return asset.id ? resp.post() : resp.put();
    }

    validateAttribute(params) {
        var url = `/api/validation/attribute/${params.attributeId}`;
        return fetch(url, {
          body: JSON.stringify(params.value)
        }).post();
    }

    calculateAsset(asset, screenId, forceRecalc) {
        var url = `/api/assettype/${asset.assetTypeId}/asset`;
        if (asset.id)
            url += `/${asset.id}`;
        url += '/calculate';
        url += `?screenId=${screenId}`;
        if (forceRecalc)
            url += '&forceRecalc=true'

        let resp = fetch(url, {
          body: JSON.stringify(asset)
        });
        return resp.post();
    }
}
