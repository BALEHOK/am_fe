/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Screen = require('./screen.jsx');
var Attribute = require('./attribute.jsx');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var Link = Router.Link;
var ReactSelectize = require('../common/react-selectize');

var AssetViewType1 = require('./assetviewtype1');

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

    getInitialState: function() {
        return {};
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
        var asset = this.dispatcher.getStore('asset').getState();
        var screens = asset.screens.map(function(el) {
            return {name: el.name, id: el.id};
        });

        var selected = this.state.selectedScreen || screens[0] && screens[0].id;
        return <AssetViewType1
            asset={asset}
            screens={screens}
            selectedScreen={selected}
            dispatcher={this.dispatcher}
            actions={this.actions} />;
    }
});
module.exports = AssetView;
