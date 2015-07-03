var Flux = require('delorean').Flux;

var LoginStore = Flux.createStore({

    user: null,

    actions: {
        'login:loginUser': 'loginUser',
        'login:logoutUser': 'logoutUser'
    },

    loginUser(token) {
        this.user = {
            userName: token.userName,
            lastLogin: token.lastLogin,
            email: token.email
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
