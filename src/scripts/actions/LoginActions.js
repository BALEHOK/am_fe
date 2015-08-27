import Actions from './Actions'
import RouterContainer from '../services/RouterContainer'
import LoginDispatcher from '../dispatchers/LoginDispatcher'
import AuthService from '../services/AuthService'

export default {
  loginUser() {
    if (AuthService.isLoggedIn()) {
      let nextPath = '/';
      let currentQuery = RouterContainer.get().getCurrentQuery();
      if (currentQuery && currentQuery.nextPath) {
        nextPath = currentQuery.nextPath;
      }

      LoginDispatcher.loginUser();

      RouterContainer.get().transitionTo(nextPath);
    }
  },

  logoutUser(params) {
    AuthService.logout();
  }
}
