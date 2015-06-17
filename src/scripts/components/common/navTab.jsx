/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var State = Router.State;
var classNames = require('classnames');

var NavTab = React.createClass({

  mixins: [ State ],

  render: function () {
    var isActive = this.isActive(this.props.to, this.props.params, this.props.query);
    var classes = classNames({
        'header-nav__item' : true,
        'header-nav__item_state_active' : isActive
    });
    var link = (
      <Link className="header-nav__item-link" {...this.props} />
    );
    return <li className={classes}>{link}</li>;
  }

});

module.exports = NavTab;
