/**
 * @jsx React.DOM
 */

var React = require('react');

var ReportsBlock = React.createClass({
    render: function() {
        var typedReports = this.props.reports.map(r => {
            var link = `${APIURL}/customreports/index/?searchId=${this.props.searchId}`;
            return <li key={r.id} className="nav-block__item">
                      <a href={link + '&id=' + r.id}
                        className="link link_second"
                        target="_blank">
                          <span className="icon icon_download"></span>{r.name}
                      </a>
                   </li>;
        });
        var reportsLink = `${APIURL}/standardreports/searchresult/?searchId=${this.props.searchId}`;
        return (
            <div>
              <span className="nav-block__title">Reports</span>
              <ul className="nav-block__list">
                  <li className="nav-block__item">
                      <a href={reportsLink + '&reportLayout=0'}
                        className="link link_second"
                        target="_blank">
                          <span className="icon icon_download"></span>Standard (Detailed)
                      </a>
                  </li>
                  <li className="nav-block__item">
                      <a href={reportsLink + '&reportLayout=1'}
                        className="link link_second"
                        target="_blank">
                          <span className="icon icon_download"></span>Standard (Compact)
                      </a>
                  </li>
                  {typedReports}
              </ul>
            </div>
        );
    }
});

module.exports = ReportsBlock;
