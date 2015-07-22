class ReportRepository {

    loadReports(assetTypeId) {
        var url = '/api/reports/custom';
        if (assetTypeId)
            url = `${url}/${assetTypeId}`;
        return $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'GET'
        });
    }

}

module.exports = ReportRepository;
