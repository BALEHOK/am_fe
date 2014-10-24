/// <reference path="../../../typings/backbone/backbone.d.ts" />
/// <reference path="../../../typings/moment/moment.d.ts" />
import moment = require('moment');
export class UserModel extends Backbone.Model {

    get userName(): string {
        return this.get('userName');
    }

    set userName(value: string) {
        this.set('userName', value);
    }

    get email(): string {
        return this.get('email');
    }

    set email(value: string) {
        this.set('email', value);
    }

    get lastLogin(): any {
        return moment(this.get('lastLogin'));
    }

    set lastLogin(value: any) {
        this.set('lastLogin', value);
    }

    get userpicPath(): string {
        return this.get('userpicPath');
    }

    set userpicPath(value: string) {
        this.set('userpicPath', value);
    }

    constructor(data?: any) {
        super();
        for (var key in data) {
            if (key) { this[key] = data[key]; }
        }
    }
}


