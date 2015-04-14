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
        // TODO: save value
    },
    render: function() {      
        var items = [];
        var value = null;
        var attributeUid = this.props.params.uid;
        var selectId = "attribute-asset-" + attributeUid;
        var listStore = this.state.stores.list.dynlists[attributeUid];
        if (listStore) {
            items = listStore.items || [];
        }
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