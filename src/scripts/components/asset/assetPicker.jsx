/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');
var AssetsCollection = require('../../models/AssetsCollection.ts').AssetsCollection;

var AssetPicker = React.createClass({
    componentWillMount: function() {
        this.collection = new AssetsCollection();
        this.collection.assetTypeId = this.props.attribute.relatedAsset.assetTypeId;
    },
    componentDidMount: function() {        
        var self = this;        
        this.collection.on("all", function() {
            self.forceUpdate();
        });
    }, 
    componentWillUnmount: function() {
        this.collection.off(null, null, this);
    },   
    onChange: function(e) {
        console.log(e);
    },
    onItemsRequest: function(query, callback) { 
        this.collection.fetch();
    },
    render: function() {
        var selectId = "attribute-" + this.props.attribute.uid;
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <ReactSelectize    
                    selectId={selectId} 
                    valueField="uid"
                    labelField="name"  
                    onItemsRequest={this.onItemsRequest}                   
                    items={this.collection.models}
                    onChange={this.onChange}    
                    value={this.props.attribute.relatedAsset.uid}                             
                    placeholder=" "
                    label=" " />                
            </li>
        );
    }
});

module.exports = AssetPicker;