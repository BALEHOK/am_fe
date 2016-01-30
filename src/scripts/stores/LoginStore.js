import { Flux }  from 'delorean';
import AuthService from '../services/AuthService';
import moment from 'moment';

var LoginStore = Flux.createStore({
    user: null,
    access_token: null,

    actions: {
        'login:authorize': 'authorize',
        'login:loginUser': 'loginUser',
        'login:logoutUser': 'logoutUser'
    },

    authorize(){
        this.user = null;
        this.access_token = null;
        AuthService.authorize();
    },

    loginUser() {
        if (!AuthService.isLoggedIn()){
            this.authorize();
            return;
        }

        let profile = AuthService.profile;

        this.user = {
            userName: profile.userName,
            lastLogin:  moment(profile.lastLogin),
            email: profile.email,
            isAdmin: profile.userRole === 'Administrators'
        };

        this.access_token = AuthService.accessToken;

        this.emitChange();
    },

    logoutUser() {
        this.user = null;
        this.access_token = null;
        AuthService.logout();
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
