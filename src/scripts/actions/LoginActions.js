import Actions from './Actions'
import RouterContainer from '../services/RouterContainer'
import LoginDispatcher from '../dispatchers/LoginDispatcher'
import AuthService from '../services/AuthService'

export default {
  loginUser() {
    LoginDispatcher.loginUser();
  },

  logoutUser(params) {
    AuthService.logout();
  }
}
