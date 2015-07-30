import Actions from './Actions'
import RouterContainer from '../services/RouterContainer'
import LoginDispatcher from '../dispatchers/LoginDispatcher'

export default {

  loginUser(tokenString) {
    var savedToken = localStorage.getItem('token');

    if (savedToken !== tokenString) {
      var nextPath = '/';
      var currentQuery = RouterContainer.get().getCurrentQuery();
      if (currentQuery && currentQuery.nextPath)
        nextPath = currentQuery.nextPath;
      RouterContainer.get().transitionTo(nextPath);
      localStorage.setItem('token', tokenString);
    }

    try {
        LoginDispatcher.loginUser(JSON.parse(tokenString));
    } catch (e) {
        localStorage.removeItem('token');
    }

  },

  logoutUser(params) {
    RouterContainer.get().transitionTo('/login', params);
    localStorage.removeItem('token');
    LoginDispatcher.logoutUser();
  }

}
