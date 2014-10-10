/// <reference path="../../../typings/backbone/backbone.d.ts" />
class UserModel extends Backbone.Model {

    userName: string;

    constructor() {
        super();
        this.userName = 'Anni Huber';
    }
}

export = UserModel;