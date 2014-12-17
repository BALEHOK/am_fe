/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Screen = require('./screen.jsx');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var assetStore = require('../../stores/AssetStore.ts').AssetStore.getInstance();

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

var Panel = React.createClass({
    render: function() {
        var self = this;
        return (
            <div>
               <h3>Panel name: {this.props.name}</h3>
               <ul>
                    {this.props.panelAttributes.map(function(attribute){
                        return <EditableAttribute key={attribute.uid} attribute={attribute} />
	           		})}
               </ul>
            </div>
        );
    }
});

var AssetEdit = React.createClass({
	mixins:[AuthenticatedRouteMixin, Router.Navigation, Router.State],
    componentDidMount: function() {
        var self = this;
        assetStore.on("all", function(){
            // workaround
        	if (self._lifeCycleState == "MOUNTED")
            	self.forceUpdate();
        });
        var params = this.getParams();
        AppDispatcher.dispatch({
            action: 'asset-view',
            data: {
            	assetTypeUid: params.assetTypeUid,
            	assetUid: params.assetUid
            }
        });
    },
    componentWillUnmount: function() {
        assetStore.off(null, null, this);
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
	        		{assetStore.screens.map(function(screen){
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
