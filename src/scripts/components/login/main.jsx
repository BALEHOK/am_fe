/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');

var LoginPage = React.createClass({
    mixins: [Backbone.React.Component.mixin, Router.Navigation],
    statics: {
        attemptedTransition: null
    },
    getInitialState: function() {
        return {errorMessage: ''};
    },
    events : {
        'click button' : 'submit'
    },
    handleSubmit : function(e){
        var login = this.refs.login.getDOMNode().value.trim();
        var password = this.refs.password.getDOMNode().value.trim();
        var authService = this.props.app.authService;
        var self = this;
        authService.login({
                username: login,
                password: password
            })
            .done(function() {
                if (LoginPage.attemptedTransition) {
                    var transition = LoginPage.attemptedTransition;
                    LoginPage.attemptedTransition = null;
                    transition.retry();
                } else {
                    self.replaceWith('/');
                }
            })
            .error(function(data) {
                self.setState({ errorMessage: data.responseJSON.error_description });
            });
    },
    render: function() {
        return (
            <form className="form-horizontal">
                {this.state.errorMessage}
                <div className="control-group">
                    <label className="control-label" htmlFor="login">Login</label>
                    <div className="controls">
                        <input type="text" id="login" ref="login" placeholder="Login" />
                    </div>
                </div>
                <div className="control-group">
                    <label className="control-label" htmlFor="password">Password</label>
                    <div className="controls">
                        <input type="password" id="password" ref="password" placeholder="Password" />
                    </div>
                </div>
                <div className="control-group">
                    <div className="controls">
                        <button type="submit" className="btn" onClick={this.handleSubmit}>Sign in</button>
                    </div>
                </div>
            </form>
        );
    }
});
module.exports = LoginPage;