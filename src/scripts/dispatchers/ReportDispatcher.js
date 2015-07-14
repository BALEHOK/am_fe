var Flux = require('delorean').Flux;
var ReportStore = require('../stores/ReportStore');

var ReportDispatcher = Flux.createDispatcher({

  loadReports(token) {
    return this.dispatch('reports:load', token);
  },

  getStores() {
    return {
      report: new ReportStore()
    }
  }

});

module.exports = ReportDispatcher;
