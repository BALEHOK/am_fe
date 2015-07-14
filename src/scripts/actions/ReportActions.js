var Actions = require('./Actions');

class ReportActions extends Actions {

  loadReports() {
    return this._dispatcher.loadReports();
  }

}

module.exports = ReportActions;
