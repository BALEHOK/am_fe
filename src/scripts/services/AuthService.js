import LoginActions from '../actions/LoginActions'
import when from 'when';

class AuthService {

  login(username, password) {
    return when($.ajax({
      url: '/token',
      type: 'POST',
      contentType: 'application/json',
      data: {
        username: username,
        password: password,
        grant_type: 'password'
      }
    }))
    .then(response => {
      LoginActions.loginUser(JSON.stringify(response));
      return true;
    });
  }

  logout() {
    LoginActions.logoutUser();
  }

}

export default new AuthService()
