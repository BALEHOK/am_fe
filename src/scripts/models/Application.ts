import router = require('./Router');
import session = require('./Session');
import user = require('./User');

export class Application extends Backbone.Model {

    currentUser: user.UserModel;
    private session: session.SessionModel;

    constructor(session: session.SessionModel) {
        super();
        this.currentUser = new user.UserModel();
        this.session = session;
    }

    start() {
        this.session.getAuth(response => {
            console.log(response);
            Backbone.history.start();
        });
    }
}