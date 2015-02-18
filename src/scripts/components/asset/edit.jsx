/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;

var Screen = require('./screen.jsx');
var Attribute = require('./attribute.jsx');
var EditableAttribute = require('./editableAttribute.jsx');
var AssetPicker = require('./assetPicker.jsx');
var BooleanAttribute = require('./booleanAttribute.jsx');
var TextAttribute = require('./textAttribute.jsx');
var ListAttribute = require('./listAttribute.jsx');
var DateTimeAttribute = require('./dateTimeAttribute');
var ReactSelectize = require('../common/react-selectize');

var Panel = React.createClass({
    render: function() {
        var self = this;
        return (
            <div>
               <h3>Panel name: {this.props.name}</h3>
               <ul>
                    {this.props.panelAttributes.map(function(attribute){    
                        if (attribute.datatype == 'asset') {
                            return <AssetPicker key={attribute.uid} 
                                                actions={self.props.actions}
                                                attribute={attribute} />
                        } else if (attribute.datatype == 'assets') {
                            return <AssetPicker key={attribute.uid} 
                                                attribute={attribute} 
                                                actions={self.props.actions}
                                                isMultiple={true} />                        
                        } else if (attribute.datatype == 'bool') {
                            return <BooleanAttribute key={attribute.uid} attribute={attribute} />                        
                        } else if (attribute.datatype == 'text') {
                            return <TextAttribute key={attribute.uid} attribute={attribute} />
                        } else if (attribute.datatype == 'revision') {
                            return <Attribute key={attribute.uid} attribute={attribute} />
                        } else if (attribute.datatype == 'dynlist') {
                            return <ListAttribute key={attribute.uid} attribute={attribute} />
                        } else if (attribute.datatype == 'dynlists') {
                            return <ListAttribute key={attribute.uid} attribute={attribute} isMultiple={true} />
                        } else if(attribute.datatype == 'datetime') {
                            return <DateTimeAttribute key={attribute.uid} attribute={attribute}/>
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
	mixins:[Flux.mixins.storeListener, Router.Navigation, Router.State],
    componentWillMount: function() {
        var params = this.getParams();
        this.props.actions.loadAsset(params);
    },

    componentWillUnmount: function() {
    },

    handleSubmit: function() {
        this.actions.saveAsset();
    },

    render: function() {
        var self = this;
        var store = this.state.stores.asset;
        return (
            <div>
                <h1>Asset Edit Page</h1>
                <form onSubmit={this.handleSubmit}>
	        		{store.asset.screens.map(function(screen){
                        return  <Screen key={screen.Id} name={screen.name}>
                                    {screen.panels.map(function(panel){
                                        return <Panel key={panel.id} 
                                                      name={panel.name} 
                                                      actions={self.props.actions}
                                                      panelAttributes={panel.attributes} />
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
