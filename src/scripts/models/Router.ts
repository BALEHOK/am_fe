import session = require('./Session');
export class Router extends Backbone.Router {

    current : string;

    constructor(session: session.SessionModel) {
        var routes: Backbone.RouterOptions = {
            routes : {
                '': 'search',
                'tasks': 'tasks',
                'categories': 'categories',
                'documents': 'documents',
                'financial': 'financial',
                'reports': 'reports',
                'reservations': 'reservations'
            }
        }
        super(routes);
        this.on("route", (route) => {
            //console.log(route);
        });
    }

    search() {
        this.current = 'search';
    }

    tasks() {
        this.current = 'tasks';
    }

    categories() {
        this.current = 'categories';
    }

    documents() {
        this.current = 'documents';
    }

    financial() {
        this.current = 'financial';
    }

    reports() {
        this.current = 'reports';
    }

    reservations() {
        this.current = 'reservations';
    }
}