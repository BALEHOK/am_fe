/// <reference path="../../../typings/backbone/backbone.d.ts" />
import models = require('../models/Asset');

export class AssetStore extends models.Asset {

	public dispatchToken: any;

	private static instance: AssetStore;
    public static getInstance() : AssetStore {
        if (AssetStore.instance == null) {
            AssetStore.instance = new AssetStore();
        }
        return AssetStore.instance;
    }

    private constructor(options?: any) {
        if (AssetStore.instance) {
            throw new Error("Error: Instantiation failed: Use AssetStore.getInstance() instead of new.");
        }
        var boundFunction = (this.dispatchCallback).bind(this);
        this.dispatchToken = AppDispatcher.register(boundFunction);    

        var self = this;
        this.url = () => {
        	return '/api/assettype/' 
        		+ self.assetTypeUid 
        		+ '/asset/'
        		+ self.uid;
        };
        this.parse = (response) => {
            this.screens = new Backbone.Collection<models.AssetScreen>(
                response.screens, {model: models.AssetScreen});
        };
        super(options);
        this.screens = new Backbone.Collection<models.AssetScreen>();
    }

    dispatchCallback(payload: any){
        if (payload.action == 'asset-view') {
        	this.assetTypeUid = payload.data.assetTypeUid;
        	this.uid = payload.data.assetUid;
            this.fetch();
        }      
        if (payload.action == 'asset-edit') {
            this.save();
        }  
    }
}