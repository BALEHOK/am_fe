var Flux = require('delorean').Flux;
var ReportStore = require('../stores/ReportStore');

var ReportDispatcher = Flux.createDispatcher({

  loadReports() {
    return this.dispatch('reports:load');
  },

  getStores() {
    return {
      report: new ReportStore()
    }
  }

});

module.exports = ReportDispatcher;
