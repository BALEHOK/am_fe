/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Flux = require('delorean').Flux;
var ReactSelectize = require('../../../common/react-selectize');

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
        var selectId = "attribute-list-" + this.props.params.uid;
        var lists = this.state.stores.list.dynlists;        
        var list = lists[this.props.params.uid];        
        var items = list != null 
            ? list.items
            : [];  
        var value = _.chain(items)
                     .where({selected: true})
                     .pluck('uid')
                     .value();           
        return (
           <div className="asset-data__param">
                <span className="asset-data__param-title">{this.props.params.name}:</span>
                <div className="input-group">
                    <ReactSelectize   
                        multiple={this.props.isMultiple} 
                        selectId={selectId} 
                        valueField="uid"
                        labelField="value" 
                        items={items} 
                        onChange={this.onChange}    
                        value={value}                             
                        placeholder=" "
                        label=" "
                        className="select_size_small" /> 
                </div>
            </div>
        );
    }
});

module.exports = ListPicker;