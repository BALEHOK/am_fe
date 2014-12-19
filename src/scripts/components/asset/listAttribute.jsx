/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');
var ListsCollection = require('../../models/ListsCollection.ts').ListsCollection;

var ListAttribute = React.createClass({
    componentWillMount: function() {
        this.collection = new ListsCollection();
        this.collection.assetTypeAttributeId = this.props.attribute.assetTypeAttributeId;
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
        this.props.attribute.value = e;        
    },
    onItemsRequest: function(query, callback) { 
        this.collection.query = query;
        this.collection.fetch();
    },
    render: function() {
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

module.exports = ListAttribute;