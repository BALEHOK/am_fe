import fetch from "../util/fetch";

export default class AssetRepository {
    loadAssetTypes() {
        var url = '/api/assettype';
        return fetch(url).get();
    }

    loadAssetAttributes(typeId) {
        var url = `/api/assettype/${typeId}`;
        return fetch(url).get();
    }
}