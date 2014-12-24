/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');
var AssetActions = require('../../actions/AssetActions');
var AssetDispatcher = require('../../dispatchers/AssetDispatcher');

var ListAttribute = React.createClass({
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
    componentDidMount: function() {        
        var self = this;        
    }, 
    componentWillUnmount: function() {
        this.dispatcher.stores.list.listener.removeListener(
            'change', this.forceUpdateBound);
    },   
    onChange: function(e) {
        this.props.attribute.value = e;        
    },
    onItemsRequest: function(query, callback) { 
        var uid = this.props.attribute.dynamicListUid;
        this.actions.loadDynamicList({
            dynamicListUid: uid
        });
    },
    render: function() {
        var selectId = "attribute-list-" + this.props.attribute.uid;
        var list = this.dispatcher.getStore('list').getState();
        console.log(list);
        return (
            <li>
                <span>{this.props.attribute.name}</span>:
                &nbsp;
                <ReactSelectize    
                    selectId={selectId} 
                    valueField="key"
                    labelField="value" 
                    items={list.items} 
                    onItemsRequest={this.onItemsRequest}                   
                    onChange={this.onChange}    
                    value={this.props.attribute.value}                             
                    placeholder=" "
                    label=" " /> 
            </li>
        );
    }
});

module.exports = ListAttribute;