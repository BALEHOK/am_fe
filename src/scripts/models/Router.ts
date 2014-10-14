import session = require('./Session');
export class Router extends Backbone.Router {

    current: string;
    private session: session.SessionModel;
    private freeAccessPages: Array<string>;

    constructor(session: session.SessionModel) {
        var options: Backbone.RouterOptions = {
            routes: {
                '*actions': 'defaultAction' // All urls will trigger this route
            }
        }
        super(options);
        this.session = session;
        this.freeAccessPages = ["login"];
    }

    defaultAction(route) {
        this.current = route;
    }

    before(route) {
        var isAuth = this.session.get('authenticated');
        var path = Backbone.history.getHash();
        if (!isAuth && !_.contains(this.freeAccessPages, path)) {
            this.session.set('redirectFrom', path);
            this.current = 'login';
            Backbone.history.navigate('login', true);
            return false;
        }
    }
}