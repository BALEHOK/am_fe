import session = require('./Session');
export class Router extends Backbone.Router {

    current : string;

    constructor(session: session.SessionModel) {
        var routes: Backbone.RouterOptions = {
            routes: {
                '*actions': 'defaultAction' // All urls will trigger this route
            }
        }
        super(routes);
        this.on("route:defaultAction", (route) => {
            this.current = route;
        });
    }
}