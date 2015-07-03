import LoginActions from '../actions/LoginActions';

class AuthService {

  login(username, password) {
    return $.ajax({
      url: '/token',
      type: 'POST',
      data: {
        username: username,
        password: password,
        grant_type: 'password'
      }
    })
    .then(function(response) {
      LoginActions.loginUser(response);
      return true;
    });
  }

  logout() {
    LoginActions.logoutUser();
  }

}

export default new AuthService()
