/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');
var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');

var MultipleListAttribute = React.createClass({
    componentWillMount: function() {
        this.dispatcher = AssetDispatcher;
        this.actions = new AssetActions(this.dispatcher);
        this.forceUpdateBound = this.forceUpdate.bind(this);
        this.dispatcher.stores.list.onChange(this.forceUpdateBound);
        var uid = this.props.attribute.dynamicListUid;
        this.actions.loadDynamicList({
            dynamicListUid: uid
        });
    },
    componentWillUnmount: function() {
        this.dispatcher.stores.list.listener.removeListener(
            'change', this.forceUpdateBound);
    },   
    onChange: function(items) {
        var values = [];
        if (items) {
            items.map(function(item){
                values.push(parseInt(item));
            });
        }
        this.props.attribute.dynamicListItemUids = values;
    },
    onItemsRequest: function(query, callback) { 
        var uid = this.props.attribute.dynamicListUid;
        this.actions.loadDynamicList({
            dynamicListUid: uid
        });
    },
    render: function() {             
        var selectId = "attribute-list-" + this.props.attribute.uid;
        var lists = this.dispatcher.getStore('list').getState().dynlists;
        var list = lists[this.props.attribute.dynamicListUid];
        var items = list != null 
            ? list.items
            : [];
        var values = this.props.attribute.dynamicListItemUids;
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <ReactSelectize    
                    multiple={true}
                    selectId={selectId} 
                    valueField="uid"
                    labelField="value" 
                    items={items} 
                    onItemsRequest={this.onItemsRequest}                   
                    onChange={this.onChange}    
                    value={values}                             
                    placeholder=" "
                    label=" " /> 
            </li>
        );
    }
});

module.exports = MultipleListAttribute;