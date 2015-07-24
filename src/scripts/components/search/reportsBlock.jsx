/**
 * @jsx React.DOM
 */

var React = require('react');

var ReportsBlock = React.createClass({
    render: function() {
        var reportsLink = `${APIURL}/standardreports/searchresult/?searchId=${this.props.searchId}`;
        return (
            <div>
              <span className="nav-block__title">Reports</span>
              <ul className="nav-block__list">
                  <li className="nav-block__item">
                      <a href={reportsLink + '&reportLayout=0'}
                        className="link link_second"
                        target="_blank">
                          <span className="icon icon_download"></span>Detailed
                      </a>
                  </li>
                  <li className="nav-block__item">
                      <a href={reportsLink + '&reportLayout=1'}
                        className="link link_second"
                        target="_blank">
                          <span className="icon icon_download"></span>Compact
                      </a>
                  </li>
              </ul>
            </div>
        );
    }
});

module.exports = ReportsBlock;
