/**
 * @jsx React.DOM
 */

var React = require('react');
var UserNav = require('./userNav');
var HeaderNav = require('./headerNav');
var Breadcrumbs = require('./breadcrumbs');

var Layout = React.createClass({
    propTypes: {
        children: React.PropTypes.component.isRequired
    },
    render: function() {
        return (
            <div className="page-wrapper">
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="container">
                            <a className="page-header__logo hide-text" href="/">ACV CSC METEA</a>
                            <span className="page-header__banner hide-text">Asset Management</span>
                            <div className="page-header__user-nav pull-right">
                                <UserNav/>
                            </div>
                        </div>
                    </div>
                    <div className="page-header__nav">
                        <HeaderNav/>
                    </div>
                </header>
                <div className="page-content">
                    <div className="container" id="content">
                        <Breadcrumbs/>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Layout;
