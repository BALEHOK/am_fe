/// <reference path="../../../../typings/backbone/backbone.d.ts" />
module Assetmanager {

    export class UserModel extends Backbone.Model {

        userName: string;

        constructor() {
            super();
            this.userName = 'Anni Huber';
        }
    }
}