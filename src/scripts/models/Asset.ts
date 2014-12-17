/// <reference path="../../../typings/backbone/backbone.d.ts" />

export class AssetScreen extends Backbone.Model {
	public get panels(): Backbone.Collection<AssetPanel> {
		return this.get('panels');
	}
	public set panels(value: Backbone.Collection<AssetPanel>) {
		this.set('panels', value);
	}

	constructor(options?: any) {
		super(options);	
		this.panels = new Backbone.Collection<AssetPanel>(
			options.panels, {model: AssetPanel});			
	}
}

export class AssetPanel extends Backbone.Model {
	public get panelAttributes(): Backbone.Collection<AssetAttribute> {
		return this.get('attributes');
	}
	public set panelAttributes(value: Backbone.Collection<AssetAttribute>) {
		this.set('attributes', value);
	}

	constructor(options?: any) {
		super(options);	
		this.panelAttributes = new Backbone.Collection<AssetAttribute>(
			options.attributes, {model: AssetAttribute});
	}
}

export class AssetAttribute extends Backbone.Model {
	public get uid(): string {
		return this.get('uid');
	} 
	public get name(): string {
		return this.get('name');
	} 
	public get value(): string {
		return this.get('value');
	} 
	public set value(value: string) {
		this.set('value', value);
	}
	public get datatype(): string {
		return this.get('datatype');
	} 
	public get relatedAsset(): string {
		return this.get('relatedAsset');
	} 
	
	constructor(options?: any) {
		super(options);	
	}
}