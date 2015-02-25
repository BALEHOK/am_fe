/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var ReactSelectize = require('../../../common/react-selectize');
var AssetActions = require('../../../../actions/AssetActions');
var AssetDispatcher = require('../../../../dispatchers/AssetDispatcher');

var ListPicker = React.createClass({
    mixins:[Flux.mixins.storeListener, Router.State],
    componentWillMount: function() {
    },
    componentWillUnmount: function() {
    },   
    onChange: function(items) {
        var values = [parseInt(items)];
        if (this.props.isMultiple) {
            values = [];
            if (items) {
                items.map(function(item){
                    values.push(parseInt(item));
                });
            }            
        }   
        // TODO: save value
    },
    render: function() {        
        var selectId = "attribute-list-" + this.props.attribute.uid;
        var lists = this.state.stores.list.dynlists;        
        var list = lists[this.props.attribute.uid];        
        var items = list != null 
            ? list.items
            : [];  
        var value = _.chain(items)
                     .where({selected: true})
                     .pluck('uid')
                     .value();           
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <ReactSelectize   
                    multiple={this.props.isMultiple} 
                    selectId={selectId} 
                    valueField="uid"
                    labelField="value" 
                    items={items} 
                    onChange={this.onChange}    
                    value={value}                             
                    placeholder=" "
                    label=" " /> 
            </li>
        );
    }
});

module.exports = ListPicker;