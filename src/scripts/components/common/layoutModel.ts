/// <reference path="../../../../typings/backbone/backbone.d.ts" />
module Assetmanager {
    
    export class LayoutModel extends Backbone.Model {

        user: UserModel;

        constructor() {
            super();
            this.user = new UserModel();
        }
    }
}