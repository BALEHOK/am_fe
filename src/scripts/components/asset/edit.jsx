/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Screen = require('./screen.jsx');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var ReactSelectize = require('../common/react-selectize');

var EditableAttribute = React.createClass({
    valueChanged: function(event) {
        this.props.attribute.value = event.target.value;
    },
    render: function() {
        return (
        	<li>
        		<span>{this.props.attribute.name}</span>:
        		&nbsp;
        		<input type="text" onChange={this.valueChanged} defaultValue={this.props.attribute.value} />
        	</li>
        );
    }
});

var EditableAssetAttribute = React.createClass({
    getInitialState: function() {
        return {
            assetTypeUid: this.props.attribute.relatedAsset.assetTypeUid
        };
    },
    onChange: function(e) {
        //console.log(e);
    },
    onItemsRequest: function(query, callback) { 
        console.log('query', query);
        var items = [
            { name: "admin", id: 612 },
            { name: "foo", id: 2 },
            { name: "bar", id: 3 }
        ];
        if (!query.length) return callback(items);
        callback(items);    

        // TODO
        //this.props.loadAssetsByAssetTypeUid(this.state.assetTypeUid, function(data){
        //    doneCallback(data);    
        //});
    },
    render: function() {
        var selectId = "attribute-" + this.props.attribute.uid;
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <ReactSelectize    
                    selectId={selectId}                      
                    onItemsRequest={this.onItemsRequest}
                    onChange={this.onChange}    
                    value={this.props.attribute.relatedAsset.uid}                             
                    placeholder=" "
                    label=" " />                
            </li>
        );
    }
});

var Panel = React.createClass({		
    render: function() {    	
    	var self = this;
        return (
        	<div>
        	   <h3>Panel name: {this.props.name}</h3>
	           <ul>
	           		{this.props.panelAttributes.map(function(attribute){
                        if (attribute.datatype == 'asset') {                            
                            return <EditableAssetAttribute key={attribute.uid} attribute={attribute} />    
                        } else {
                            return <EditableAttribute key={attribute.uid} attribute={attribute} />    
                        }	           			
	           		})}	           		
	           </ul>
	        </div>
        );
    }
});

var AssetEdit = React.createClass({
	mixins:[AuthenticatedRouteMixin, Router.Navigation],
	componentDidMount: function() {
        var self = this;
        this.props.AssetStore.on("all", function(){
        	// workaround
        	if (self._lifeCycleState == "MOUNTED")          	
            	self.forceUpdate();        
        });
    	AppDispatcher.dispatch({
            action: 'asset-view', 
            data: {
            	assetTypeUid: this.props.params.assetTypeUid,
            	assetUid: this.props.params.assetUid
            }
        });
    },
    componentWillUnmount: function() {         
        this.props.AssetStore.off(null, null, this);
    },
    handleSubmit: function() {
    	AppDispatcher.dispatch({
            action: 'asset-edit'
        });
    },
    render: function() {        
        return (
        	<div>
        		<h1>Asset Edit Page</h1>
        		<form onSubmit={this.handleSubmit}>
	        		{this.props.AssetStore.screens.map(function(screen){ 
                        return  <Screen key={screen.Id} name={screen.name}>                                      
                                    {screen.panels.map(function(panel){                                                
                                        return <Panel key={panel.id} name={panel.name} panelAttributes={panel.panelAttributes} />
                                    })}  
                                </Screen>
                    })}
	        		<input type="submit" value="Save" />
        		</form>
        	</div>
       	);
    }
});
module.exports = AssetEdit;
