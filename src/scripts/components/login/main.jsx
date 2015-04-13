/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');

var LoginPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
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
                self.context.router.transitionTo('/');
            })
            .error(function(data) {
                console.log(data);
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
                        <div className="btn" onClick={this.handleSubmit}>Sign in</div>
                    </div>
                </div>
            </form>
        );
    }
});
module.exports = LoginPage;