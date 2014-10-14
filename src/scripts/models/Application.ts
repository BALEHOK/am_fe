import session = require('./Session');
import user = require('./User');

export class Application extends Backbone.Model {

    currentUser: user.UserModel;

    constructor(/*session: session.SessionModel*/) {
        super();
        this.currentUser = new user.UserModel();
    }
}