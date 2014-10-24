import router = require('./Router');
import session = require('./Session');

export class Application extends Backbone.Model {

    session: session.SessionModel;

    constructor(session: session.SessionModel) {
        super();
        this.session = session;
        $.ajaxPrefilter((options, originalOptions, jqXHR) => {
            // TODO: inject via config
            options.url = 'http://facilitymanager.facilityflexware.com/' + options.url;
            if (session.authenticated)
                return jqXHR.setRequestHeader('Authorization', 'Bearer ' + session.bearerToken);
        });
    }

    start(callback: any) {
        this.session.getAuth(response => {
            Backbone.history.start();
        })
        .always(callback);
    }
}
