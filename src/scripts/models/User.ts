/// <reference path="../../../typings/backbone/backbone.d.ts" />
/// <reference path="../../../typings/moment/moment.d.ts" />
import moment = require('moment');
export class UserModel extends Backbone.Model {

    userName: string;
    userpicPath: string;
    lastLogin: Moment;

    constructor() {
        super();
        this.userName = 'Anni Huber';
        this.userpicPath = 'assets/images/girl_avatar.jpg';
        this.lastLogin = moment();
        this.urlRoot = '/api/auth';
    }
}


