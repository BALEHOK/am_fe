class HistoryRepository {
    loadHistory(params) {
        var url = `/api/assettype/${params.assetTypeUid}/asset/${params.assetUid}/history`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }
}

module.exports = HistoryRepository;