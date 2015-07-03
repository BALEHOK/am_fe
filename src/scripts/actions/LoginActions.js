import Actions from './Actions'
import RouterContainer from '../services/RouterContainer'
import LoginDispatcher from '../dispatchers/LoginDispatcher'

class LoginActions {

  constructor() {
    this._dispatcher = new LoginDispatcher();
  }

  loginUser(token) {
    var savedToken = localStorage.getItem('token');

    if (savedToken !== token) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

      RouterContainer.get().transitionTo(nextPath);
      localStorage.setItem('token', token);
    }

    this._dispatcher.loginUser(token);
  }

  logoutUser() {
    RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('token');
    this._dispatcher.logoutUser();
  }

}

export default new LoginActions()
