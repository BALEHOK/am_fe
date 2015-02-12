/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var ReactSelectize = require('../common/react-selectize');
var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');

var AssetPicker = React.createClass({
    mixins:[Flux.mixins.storeListener, Router.State],
    componentWillMount: function() {
    },
    componentWillUnmount: function() {
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
        //this.actions.loadAssetsList({
        //    assetTypeId: this.props.asset.assetTypeId,
        //    query: query
        //});
    },
    render: function() {
        var items = [];
        var value = null;
        var attributeUid = this.props.attribute.uid;
        var selectId = "attribute-asset-" + attributeUid;
        var relatedAttribute = _
            .chain(this.state.stores.asset.relatedAssets)
            .findWhere({attributeUid: attributeUid})
            .value();
        if (relatedAttribute) {
            items = relatedAttribute.assets;
            value = _.pluck(relatedAttribute.assets, 'assetId');
        }          
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <ReactSelectize   
                    multiple={this.props.isMultiple} 
                    selectId={selectId} 
                    valueField="assetId"
                    labelField="name"  
                    sortField="assetId"                    
                    items={items}
                    onItemsRequest={this.onItemsRequest}                   
                    onChange={this.onChange}    
                    value={value}                             
                    placeholder=" "
                    label=" " />                
            </li>
        );
    }
});

module.exports = AssetPicker;