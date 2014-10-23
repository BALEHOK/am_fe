import session = require('./Session');
import user = require('./User');
import authServiceModule = require('../services/AuthService');
import exceptionsModule = require('../exceptions');

export class Application extends Backbone.Model {

    public get Session() {
        return this.session;
    }

    private session: session.SessionModel = new session.SessionModel();
    private authService: authServiceModule.IAuthService;

    constructor(authService: authServiceModule.IAuthService) {
        super();
        if (authService == null)
            throw new exceptionsModule.ArgumentNullException();
        var self = this;
        this.authService = authService;
        this.authService.LoggedIn.on(response => {
            self.session.authenticated = true;
            self.session.user = new user.UserModel({
                userName: response.UserName,
                lastLogin: response.LastLogin,
                email: response.Email
            });
            localStorage.setItem('bearerToken', response.access_token);
            //self.session.expirationDate = new Date(response['.expires']);
        });
    }
}