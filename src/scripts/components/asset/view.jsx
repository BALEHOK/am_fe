/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Screen = require('./screen.jsx');
var Attribute = require('./attribute.jsx');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var Link = Router.Link;

var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');

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
    },
    componentWillMount: function() {
        this.dispatcher = AssetDispatcher;
        this.actions = new AssetActions(this.dispatcher);

        var params = this.getParams();

        this.forceUpdateBound = this.forceUpdate.bind(this);
        this.dispatcher.stores.asset.onChange(this.forceUpdateBound);

        this.actions.loadAsset(params);
    },

    componentWillUnmount: function() {
        this.dispatcher.stores.asset.listener.removeListener('change', this.forceUpdateBound);
    },

    render: function() {
        var params = this.getParams();
        var asset = this.dispatcher.getStore('asset').getState();
        return (
            <div>
                <h1>Asset View Page</h1>
                <Link to="asset-edit"
                    params={{
                        assetTypeUid: params.assetTypeUid,
                        assetUid: params.assetUid}}>Edit</Link>

                {asset.screens.map(function(screen){
                    return  <Screen key={screen.Id} name={screen.name}>
                                {screen.panels.map(function(panel){
                                    return <Panel key={panel.id} name={panel.name} panelAttributes={panel.attributes} />
                                })}
                            </Screen>
                })}
            </div>
        );
    }
});
module.exports = AssetView;
