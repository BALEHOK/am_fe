/// <reference path="../../../typings/backbone/backbone.d.ts" />
import models = require('../models/Asset');

export class AssetsCollection extends Backbone.Collection<models.Asset> {

    public assetTypeId: number;
    public query: string;
    public rowStart: number = 1;
    public rowsNumber: number = 20;

    private constructor(options?: any) {
    	super(options);
        var self = this;
        this.model = models.Asset;
        this.url = () => {
        	return '/api/assettype/id/' 
        		+ self.assetTypeId 
        		+ '/asset/'
        		+ '?query=' + this.query 
        		+ '&rowStart=' + this.rowStart
        		+ '&rowsNumber=' + this.rowsNumber;		
        };        
    }
}