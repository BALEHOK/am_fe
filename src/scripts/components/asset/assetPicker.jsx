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

        var params = this.getParams();
        this.actions.loadRelatedAssets({
            assetTypeUid: params.assetTypeUid,
            assetUid: params.assetUid,
            attributeUid: this.props.attribute.uid
        });
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
        var params = this.getParams();
        this.actions.loadRelatedAssets({
            assetTypeUid: params.assetTypeUid,
            assetUid: params.assetUid,
            attributeUid: this.props.attribute.uid,
            query: query
        });
    },
    render: function() {
        var selectId = "attribute-asset-" + this.props.attribute.uid;
        var asset = this.dispatcher.getStore('asset').getState();
        var assets = asset.relatedAssets[this.props.attribute.uid];
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