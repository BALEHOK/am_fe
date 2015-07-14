var Flux = require('delorean').Flux;
var ReportRepository = require('../services/ReportRepository');

var ReportStore = Flux.createStore({

    reports: [],

    actions: {
        'reports:load': 'loadReports',
    },

    initialize() {
        this.reportRepo = new ReportRepository();
    },

    loadReports() {
        this.reportRepo.loadReports().then((data) => {
            this.reports = data;
            this.emitChange();
        });
    },

    getState() {
        return  {
            reports: this.reports,
        }
    }

});

module.exports = ReportStore;
