/**
 * @jsx React.DOM
 */

var React = require('react');

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
            <div>
              <span className="nav-block__title">Reports</span>
              <ul className="nav-block__list">
                  <li className="nav-block__item">
                      <a href={`${APIURL}/standardreports/asset/?assetId=${this.props.assetId}`}
                        className="link link_second"
                        target="_blank">
                          <span className="icon icon_download"></span>Standard
                      </a>
                  </li>
                  <li className="nav-block__item">
                      <a href={`${APIURL}/standardreports/assetwithchildren/?assetId=${this.props.assetId}`}
                        className="link link_second"
                        target="_blank">
                          <span className="icon icon_download"></span>Standard (with Child Assets)
                      </a>
                  </li>
                  {customReports}
              </ul>
            </div>
        );
    }
});

module.exports = ReportsBlock;
