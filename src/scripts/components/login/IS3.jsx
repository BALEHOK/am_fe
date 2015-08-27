import React from 'react/addons'
import AuthService from '../../services/AuthService'
import LoginActions from '../../actions/LoginActions'

export default class Login extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (window.location.hash && window.location.hash.indexOf('access_token') != -1) {
            AuthService.handleCallback()
                .then(() => LoginActions.loginUser());
        } else {
            AuthService.authorize();
        }
    }

    render() {
        return (
            <div className="auth-screen">
                Logging in...
            </div>
        );
    }
}
