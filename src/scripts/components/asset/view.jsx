/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Screen = require('./screen.jsx');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var Link = Router.Link;

var Attribute = React.createClass({
    render: function() {
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <span>{this.props.attribute.value}</span>
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
                        return <Attribute key={attribute.uid} attribute={attribute} />
                    })}                 
               </ul>
            </div>
        );
    }
});

var AssetView = React.createClass({
	mixins:[AuthenticatedRouteMixin, Router.Navigation],
	componentDidMount: function() {
        var self = this;
        this.props.AssetStore.on("all", function(){   
            // workaround
            if (self._lifeCycleState == "MOUNTED")    	
                self.forceUpdate();        
        });
    },
    componentWillMount: function() {    	
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
    render: function() {    	
        return (
        	<div>
        		<h1>Asset View Page</h1>
                <Link to="asset-edit" 
                    params={{
                        assetTypeUid: this.props.params.assetTypeUid, 
                        assetUid: this.props.params.assetUid}}>Edit</Link>

        		{this.props.AssetStore.screens.map(function(screen){                              		     			
        			return  <Screen key={screen.Id} name={screen.name}>
                                {screen.panels.map(function(panel){
                                    return <Panel key={panel.id} name={panel.name} panelAttributes={panel.panelAttributes} />
                                })}  
                            </Screen>
        		})}
        	</div>
       	);
    }
});
module.exports = AssetView;