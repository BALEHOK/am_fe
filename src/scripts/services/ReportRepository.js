class ReportRepository {

    loadReports() {
        return $.ajax({
            url: '/api/reports/custom',
            contentType: 'application/json',
            type: 'GET'
        });
    }

}

module.exports = ReportRepository;
