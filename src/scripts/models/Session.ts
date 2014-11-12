/// <reference path="../../../typings/backbone/backbone.d.ts" />
import user = require('./User');

export class SessionModel extends Backbone.Model {

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