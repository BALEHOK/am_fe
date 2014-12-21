/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Screen = require('./screen.jsx');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var Link = Router.Link;
var assetStore = null;//require('../../stores/AssetStore.ts').AssetStore.getInstance();

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
	mixins:[AuthenticatedRouteMixin, Router.Navigation, Router.State],
	componentDidMount: function() {
        var self = this;
        assetStore.on("all", function(){
            // workaround
            if (self._lifeCycleState == "MOUNTED")
                self.forceUpdate();
        });
    },
    componentWillMount: function() {
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
    render: function() {
        var params = this.getParams();
        return (
            <div>
                <h1>Asset View Page</h1>
                <Link to="asset-edit"
                    params={{
                        assetTypeUid: params.assetTypeUid,
                        assetUid: params.assetUid}}>Edit</Link>

        		{assetStore.screens.map(function(screen){
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
