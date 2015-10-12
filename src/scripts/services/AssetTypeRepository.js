import fetch from "../util/fetch";

export default class AssetRepository {
    loadAssetTypes() {
        var url = '/api/assettype';
        return fetch(url).get();
    }
}