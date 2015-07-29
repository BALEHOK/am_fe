import React from 'react/addons'
import Router from 'react-router'
import reactMixin from 'react-mixin'
import AuthService from '../../services/AuthService'

@reactMixin.decorate(React.addons.LinkedStateMixin)
export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessage: '',
            username: '',
            password: '',
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        var self = this;
        AuthService.login(this.state.username, this.state.password)
          .catch(function(err) {
            self.setState({ errorMessage: err.responseJSON.error_description });
            console.log("Error logging in", err);
          });
    }

    render() {
        return (
            <div className="auth-screen">
                <div className="auth-screen__content">
                    <span className="auth-screen__logo logo hide-text">ACV CSC METEA</span>
                    <span className="auth-screen__title">Admin access</span>
                    <form className="auth-screen__form" onSubmit={this.handleSubmit.bind(this)}>
                        {this.state.errorMessage}
                        <label className="input-txt input-txt_width_full">
                            <input type="text" className="input-txt__field" id="username" valueLink={this.linkState('username')} placeholder="Username" />
                        </label>
                        <label className="input-txt input-txt_width_full">
                            <input type="password" className="input-txt__field" id="password" valueLink={this.linkState('password')} placeholder="Password" />
                        </label>
                        <div className="auth-screen__form-controls">
                            <button className="btn btn_width_full">Login</button>
                        </div>
                    </form>
                    <div className="txt-center">
                        <a href="#" target="_blank" className="link">Contact suport</a>
                    </div>
                </div>
            </div>
        );
    }
}

