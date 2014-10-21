import router = require('./Router');
import session = require('./Session');

export class Application extends Backbone.Model {

    session: session.SessionModel;

    constructor(session: session.SessionModel) {
        super();
        this.session = session;
        $.ajaxPrefilter((options, originalOptions, jqXHR) => {
            // TODO: inject via config
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