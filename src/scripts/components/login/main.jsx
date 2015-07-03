import React from 'react/addons';
import Router from 'react-router';
import reactMixin from "react-mixin";

@reactMixin.decorate(React.addons.LinkedStateMixin)
export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessage: '',
            login: '',
            password: '',
        };
    }

    handleSubmit(e) {
        var nextPath = this.context.router.getCurrentQuery().nextPath;
        var login = this.refs.login.getDOMNode().value.trim();
        var password = this.refs.password.getDOMNode().value.trim();
        var authService = this.props.app.authService;
        var self = this;
        authService.login({
                username: login,
                password: password
            })
            .done(function() {
                if (nextPath) {
                    self.context.router.replaceWith(nextPath);
                } else {
                    self.context.router.replaceWith('/');
                }
            })
            .error(function(data) {
                self.setState({ errorMessage: data.responseJSON.error_description });
            });
    }

    render() {
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
                        <div className="btn" onClick={this.handleSubmit.bind(this)}>Sign in</div>
                    </div>
                </div>
            </form>
        );
    }
}

