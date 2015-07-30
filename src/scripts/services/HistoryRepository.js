import fetch from "../util/fetch";

export default class HistoryRepository {
    loadHistory(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset/${params.assetId}/history`;
        return fetch(url).get();
    }
}
