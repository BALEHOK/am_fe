import React from 'react/addons'
import AuthService from '../../services/AuthService'
import LoginActions from '../../actions/LoginActions'

export default class Login extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
       AuthService.authorize();
    }

    render() {
        return (
            <div className="auth-screen">
                Logging in to #{AUTHURL}...
            </div>
        );
    }
}
