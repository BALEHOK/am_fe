import Actions from './Actions'
import RouterContainer from '../services/RouterContainer'
import LoginDispatcher from '../dispatchers/LoginDispatcher'

export default {
  authorize() {
    LoginDispatcher.authorize();
  },

  loginUser() {
    LoginDispatcher.loginUser();
  },

  logoutUser() {
    LoginDispatcher.logoutUser();
  }
}
