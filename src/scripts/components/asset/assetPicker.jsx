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
    relatedAttribute: undefined,
    componentWillMount: function() {
    },
    componentWillUnmount: function() {
    },
    componentDidUpdate: function() {  
        var attributeUid = this.props.attribute.uid;
        this.relatedAttribute = _
            .chain(this.state.stores.asset.relatedAssets)
            .findWhere({attributeUid: attributeUid})
            .value();
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
        this.props.actions.loadAssetsList({
           assetTypeId: this.relatedAttribute.relatedAssetTypeId,
           query: query
        });
    },
    render: function() {
        var items = [];
        var value = null;
        var attributeUid = this.props.attribute.uid;
        var selectId = "attribute-asset-" + attributeUid;
        if (this.relatedAttribute) {
            items = 
                // all items from server, should be loaded on demand (to select a new one)
                this.state.stores.list.assets[this.relatedAttribute.relatedAssetTypeId] ||
                // pre-selected item(s) which come from server as attribute values
                this.relatedAttribute.assets; 
            value = _.pluck(this.relatedAttribute.assets, 'id');
        }          
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <ReactSelectize   
                    multiple={this.props.isMultiple} 
                    selectId={selectId} 
                    valueField="id"
                    labelField="name"  
                    sortField="id"                    
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