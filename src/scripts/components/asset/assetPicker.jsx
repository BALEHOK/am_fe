/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var ReactSelectize = require('../common/react-selectize');
var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');

var AssetPicker = React.createClass({
    mixins:[Router.State],
    componentWillMount: function() {
        this.dispatcher = AssetDispatcher;
        this.actions = new AssetActions(this.dispatcher);
        this.forceUpdateBound = this.forceUpdate.bind(this);
        this.dispatcher.stores.asset.onChange(this.forceUpdateBound);
    },
    componentWillUnmount: function() {
        this.dispatcher.stores.asset.listener.removeListener(
            'change', this.forceUpdateBound);
    },   
    onChange: function(e) {
        var values = e;
        if (this.props.isMultiple) {
            values = [];
            if (e) {
                e.map(function(item){
                    values.push(parseInt(item));
                });
            }            
        }   
        this.props.attribute.value = values;        
    },
    onItemsRequest: function(query, callback) { 
        this.actions.loadAssetsList({
            assetTypeId: this.props.asset.assetTypeId,
            query: query
        });
    },
    render: function() {
        var selectId = "attribute-asset-" + this.props.attribute.uid;
        var assetTypeId = this.props.asset.assetTypeId;
        var assets = this.dispatcher.getStore('list').getState().assets[assetTypeId];
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <ReactSelectize   
                    multiple={this.props.isMultiple} 
                    selectId={selectId} 
                    valueField="uid"
                    labelField="name"  
                    sortField="uid"                    
                    items={assets}
                    onItemsRequest={this.onItemsRequest}                   
                    onChange={this.onChange}    
                    value={this.props.attribute.value}                             
                    placeholder=" "
                    label=" " />                
            </li>
        );
    }
});

module.exports = AssetPicker;