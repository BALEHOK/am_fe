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
        $.ajaxPrefilter((options, originalOptions, jqXHR) => {
            options.url = 'http://am.local' + options.url;
        });
    }

    start(callback: any) {
        this.session.getAuth(response => {
            Backbone.history.start();
        })
        .always(callback);
    }
}