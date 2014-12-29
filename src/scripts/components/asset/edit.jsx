/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Screen = require('./screen.jsx');

var Attribute = require('./attribute.jsx');
var EditableAttribute = require('./editableAttribute.jsx');
var AssetPicker = require('./assetPicker.jsx');
var BooleanAttribute = require('./booleanAttribute.jsx');
var TextAttribute = require('./textAttribute.jsx');
var ListAttribute = require('./listAttribute.jsx');
var MultipleListAttribute = require('./multipleListAttribute.jsx');

var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var ReactSelectize = require('../common/react-selectize');

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
                        if (attribute.datatype == 'asset') {
                            return <AssetPicker key={attribute.uid} attribute={attribute} />
                        } else if (attribute.datatype == 'bool') {
                            return <BooleanAttribute key={attribute.uid} attribute={attribute} />                        
                        } else if (attribute.datatype == 'text') {
                            return <TextAttribute key={attribute.uid} attribute={attribute} />
                        } else if (attribute.datatype == 'revision') {
                            return <Attribute key={attribute.uid} attribute={attribute} />
                        } else if (attribute.datatype == 'dynlist') {
                            return <ListAttribute key={attribute.uid} attribute={attribute} />
                        } else if (attribute.datatype == 'dynlists') {
                            return <MultipleListAttribute key={attribute.uid} attribute={attribute} />
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
	mixins:[AuthenticatedRouteMixin, Router.Navigation, Router.State],
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

    handleSubmit: function() {
        this.actions.saveAsset();
    },

    render: function() {
        var asset = this.dispatcher.getStore('asset').getState();
        return (
            <div>
                <h1>Asset Edit Page</h1>
                <form onSubmit={this.handleSubmit}>
	        		{asset.screens.map(function(screen){
                        return  <Screen key={screen.Id} name={screen.name}>
                                    {screen.panels.map(function(panel){
                                        return <Panel key={panel.id} name={panel.name} panelAttributes={panel.attributes} />
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
