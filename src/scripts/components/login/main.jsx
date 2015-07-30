import React from 'react/addons'
import Router from 'react-router'
import reactMixin from 'react-mixin'
import AuthService from '../../services/AuthService'
import cx from 'classnames'

@reactMixin.decorate(React.addons.LinkedStateMixin)
export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessage: '',
            username: '',
            password: '',
            isLoading: false,
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        var self = this;
        self.setState({ isLoading: true});
        AuthService.login(this.state.username, this.state.password)
          .catch(function(err) {
            return err.response.json();
          }).then(({error}) => {
            self.setState({ errorMessage: error });
            console.log("Error logging in", error);
          });
    }

    render() {

        var inputTxtClasses = cx({
            'input-txt': true,
            'input-txt_type_second': true,
            'input-txt_width_full': true,
            'input-txt_state_error': this.state.errorMessage && !this.state.isLoading
        });

        return (
            <div className="auth-screen">
                <div className="auth-screen__content">
                    <span className="auth-screen__logo logo hide-text">ACV CSC METEA</span>
                    <span className="auth-screen__title">FMIS</span>
                    <form className="auth-screen__form" onSubmit={this.handleSubmit.bind(this)}>
                        <label className={inputTxtClasses}>
                            <input type="text" className="input-txt__field" id="username" valueLink={this.linkState('username')} placeholder="Username" />
                        </label>
                        <label className={inputTxtClasses}>
                            <input type="password" className="input-txt__field" id="password" valueLink={this.linkState('password')} placeholder="Password" />
                        </label>
                        {this.state.errorMessage && !this.state.isLoading
                            ? <span className="auth-screen__form-error">{this.state.errorMessage}</span>
                            : null
                        }
                        <div className="auth-screen__form-controls">
                            <button className="btn btn_type_third btn_width_full" disabled={this.state.isLoading}>
                                {this.state.isLoading? 'Loging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <div className="txt-center">
                        <a href="#" target="_blank" className="link">Contact support</a>
                    </div>
                </div>
            </div>
        );
    }
}
