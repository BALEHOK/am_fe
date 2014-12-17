/// <reference path="../../../typings/backbone/backbone.d.ts" />
import models = require('../models/Asset');

export class AssetsCollection extends Backbone.Collection<models.Asset> {

    public assetTypeId: number;

    private constructor(options?: any) {
        var self = this;
        this.model = models.Asset;
        this.url = () => {
        	return '/api/assettype/id/' + self.assetTypeId + '/asset/';       		
        };
        super(options);
    }
}