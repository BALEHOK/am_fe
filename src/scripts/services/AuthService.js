import LoginActions from '../actions/LoginActions'
import fetch from "fetchival";

class AuthService {

  login(username, password) {
    return fetch('/token').post({
        username,
        password,
        grant_type: 'password'
    }).then(response => {
        LoginActions.loginUser(JSON.stringify(response));
        return true;
    });
  }

  logout() {
    LoginActions.logoutUser();
  }

}

export default new AuthService()
