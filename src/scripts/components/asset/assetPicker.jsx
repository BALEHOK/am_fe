/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');
var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');

var AssetPicker = React.createClass({
    componentWillMount: function() {
        this.dispatcher = AssetDispatcher;
        this.actions = new AssetActions(this.dispatcher);
        this.forceUpdateBound = this.forceUpdate.bind(this);
        this.dispatcher.stores.list.onChange(this.forceUpdateBound);
        var assetTypeId = this.props.attribute.relatedAsset.assetTypeId;        
        this.actions.loadAssetsList({
            assetTypeId: assetTypeId
        });
    },
    componentWillUnmount: function() {
        this.dispatcher.stores.list.listener.removeListener(
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
        var assetTypeId = this.props.attribute.relatedAsset.assetTypeId;
        this.actions.loadAssetsList({
            assetTypeId: assetTypeId,
            query: query
        });
    },
    render: function() {
        var selectId = "attribute-asset-" + this.props.attribute.uid;
        var lists = this.dispatcher.getStore('list').getState().assets;
        var list = lists[this.props.attribute.relatedAsset.assetTypeId];
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <ReactSelectize   
                    multiple={this.props.isMultiple} 
                    selectId={selectId} 
                    valueField="uid"
                    labelField="name"  
                    items={list}
                    onItemsRequest={this.onItemsRequest}                   
                    onChange={this.onChange}    
                    value={this.props.attribute.relatedAsset.uid}                             
                    placeholder=" "
                    label=" " />                
            </li>
        );
    }
});

module.exports = AssetPicker;