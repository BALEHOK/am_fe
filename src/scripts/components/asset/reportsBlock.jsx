var React = require('react');
var L20nMessage = require('../intl/l20n-message');

var ReportsBlock = React.createClass({
    render: function() {
        var customReports = this.props.reports.map(r => {
            var link = `${APIURL}/customreports/index/${r.id}?assetId=${this.props.assetId}`;
            return <li key={r.id} className="nav-block__item">
                      <a href={link}
                        className="link link_second"
                        target="_blank">
                          <span className="icon icon_download"></span>{r.name}
                      </a>
                   </li>;
        });
        return (
            <nav className="nav-block">
              <span className="nav-block__title nav-block__title_type_second">{L20nMessage('assetPageReports', 'Reports')}</span>
              <ul className="nav-block__list">
                  <li className="nav-block__item">
                      <a href={`${APIURL}/standardreports/asset/?assetTypeId=${this.props.assetTypeId}&assetId=${this.props.assetId}`}
                        className="link link_second"
                        target="_blank">
                          <span className="icon icon_download"></span>{L20nMessage('assetPageReportStandart', 'Standard')}
                      </a>
                  </li>
                  <li className="nav-block__item">
                      <a href={`${APIURL}/standardreports/assetwithchildren/?assetTypeId=${this.props.assetTypeId}&assetId=${this.props.assetId}`}
                        className="link link_second"
                        target="_blank">
                          <span className="icon icon_download"></span>{L20nMessage('assetPageReportWithChild', 'Standard (with Child Assets)')}
                      </a>
                  </li>
                  {customReports}
              </ul>
            </nav>
        );
    }
});

module.exports = ReportsBlock;
