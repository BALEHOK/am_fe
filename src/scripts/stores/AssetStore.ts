/// <reference path="../../../typings/backbone/backbone.d.ts" />

export class AssetStore extends Backbone.Model {

    public get screens(): any {
        return this.get('screens');
    }
    public set screens(value: any) {
        this.set('screens', value);
    }
	public get assetTypeUid(): number {
		return this.get('assetTypeUid');
	}
	public set assetTypeUid(value: number) {
		this.set('assetTypeUid', value);
	}
	public get assetUid(): number {
		return this.get('assetUid');
	}
	public set assetUid(value: number) {
		this.set('assetUid', value);
	}

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
        this.url = function() {
        	return '/api/assettype/' 
        		+ self.assetTypeUid 
        		+ '/asset/'
        		+ self.assetUid;
        };
        super(options);
        this.screens = [];
    }

    dispatchCallback(payload: any){
        if (payload.action == 'asset-view') {
        	this.assetTypeUid = payload.data.assetTypeUid;
        	this.assetUid = payload.data.assetUid;
            this.fetch();
        }      
        if (payload.action == 'asset-edit') {
            this.save();
        }  
    }

}