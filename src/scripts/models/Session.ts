/// <reference path="../../../typings/backbone/backbone.d.ts" />
import user = require('./User');

export class SessionModel extends Backbone.Model {

    get authenticated() : boolean {
        return this.get('authenticated');
    }

    set authenticated(value: boolean) {
        this.set('authenticated', value);
    }

    get user(): user.UserModel {
        return this.get('user');
    }

    set user(value: user.UserModel) {
        this.set('user', value);
    }
    
    private supportStorage: boolean;
    private expirationDate: Date;

    constructor() {
        super();
    }
}