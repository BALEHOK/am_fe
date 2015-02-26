class HistoryRepository {
    loadHistory(params) {
        var url = `/api/assettype/${params.assetTypeId}/asset/${params.assetId}/history`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }
}

module.exports = HistoryRepository;