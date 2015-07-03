import React from 'react/addons';
import Router from 'react-router';
import reactMixin from "react-mixin";
import Auth from '../../services/AuthService'

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
        e.preventDefault();
        var self = this;
        Auth.login(this.state.user, this.state.password)
          .catch(function(err) {
            self.setState({ errorMessage: err.responseJSON.error_description });
            console.log("Error logging in", err);
          });
    }

    render() {
        return (
            <form className="form-horizontal">
                {this.state.errorMessage}
                <div className="control-group">
                    <label className="control-label" htmlFor="login">Login</label>
                    <div className="controls">
                        <input type="text" id="login" valueLink={this.linkState('login')} placeholder="Login" />
                    </div>
                </div>
                <div className="control-group">
                    <label className="control-label" htmlFor="password">Password</label>
                    <div className="controls">
                        <input type="password" id="password" valueLink={this.linkState('password')} placeholder="Password" />
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

