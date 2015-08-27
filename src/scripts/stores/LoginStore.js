import { Flux }  from 'delorean'
import AuthService from '../services/AuthService'

var LoginStore = Flux.createStore({
    user: null,
    access_token: null,

    actions: {
        'login:loginUser': 'loginUser',
        'login:logoutUser': 'logoutUser'
    },

    loginUser() {
        let profile = AuthService.profile;

        this.user = {
            userName: profile.userName,
            lastLogin: profile.lastLogin,
            email: profile.email
        };

        this.emitChange();
    },

    logoutUser() {
        this.user = null;
        this.emitChange();
    },

    isLoggedIn() {
        return !!this.user;
    },

    getState() {
        return {
            user: this.user
        }
    }
});

export default new LoginStore();
