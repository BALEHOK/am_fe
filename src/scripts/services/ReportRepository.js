import fetch from "../util/fetch";

class ReportRepository {

    loadReports(assetTypeId) {
        var url = '/api/reports/custom';
        if (assetTypeId)
            url = `${url}/${assetTypeId}`;
        return fetch(url).get();
    }

}

module.exports = ReportRepository;
