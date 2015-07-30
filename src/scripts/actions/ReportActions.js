var Actions = require('./Actions');

class ReportActions extends Actions {

  loadReports(assetTypeId) {
    return this._dispatcher.loadReports(assetTypeId);
  }

}

module.exports = ReportActions;
