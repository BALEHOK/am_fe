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
            return err.response.json();
          }).then(({error}) => {
            self.setState({ errorMessage: error });
            console.log("Error logging in", error);
          });
    }

    render() {
        return (
            <form className="form-horizontal">
                {this.state.errorMessage}
                <div className="control-group">
                    <label className="control-label" htmlFor="username">Username</label>
                    <div className="controls">
                        <input type="text" id="username" valueLink={this.linkState('username')} placeholder="Username" />
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
