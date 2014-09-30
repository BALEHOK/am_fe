/**
 * @jsx React.DOM
 */

var React = require('react');

var UserInfo = React.createClass({
    render: function() {
        return (
          <div>
            <div className="user-avatar">
              <img width={40} alt="Anni Huber" src="assets/images/girl_avatar.jpg" />
            </div>
            <div className="user-info">
              <a title="Profile" href="#"><strong>Anni Huber</strong></a>
              <span className="user-actions">
                <a className="fa fa-gear" title="Settings" href="#" />
                <a className="fa fa-question-circle" title="Settings" href="#" />
                <a className="fa fa-envelope" title="Settings" href="#" />
              </span> 
              <span className="info">Last login: 12:33   25.09.2014</span>
            </div>
          </div>
      );
    }
});

module.exports = UserInfo;